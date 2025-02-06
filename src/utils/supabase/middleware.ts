import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("request.nextUrl.pathname", request.nextUrl.pathname);
    if (
        !user &&
        !request.nextUrl.pathname.startsWith("/auth/login") &&
        !request.nextUrl.pathname.startsWith("/auth/email-not-confirmed") &&
        !request.nextUrl.pathname.startsWith("/auth/signup") &&
        !request.nextUrl.pathname.startsWith("/api/auth/confirm")
    ) {
        // no user, potentially respond by redirecting the user to the login page
        console.log("REDIRECTING TO LOGIN BECAUSE USER IS NOT LOGGED IN");
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }
    if (user) {
        const { data: profile } = await supabase
            .from("profile")
            .select("onboarding_status")
            .eq("id", user?.id)
            .single();
        // If user is logged in and onboarding is in progress, redirect to onboarding page
        if (
            profile?.onboarding_status === "IN_PROGRESS" &&
            !request.nextUrl.pathname.startsWith("/onboard")
        ) {
            const url = request.nextUrl.clone();
            url.pathname = "/onboard/kyc/identity";
            return NextResponse.redirect(url);
        }
        // if user is logged in and not in onboarding, and is on login or signup page, redirect to dashboard
        if (request.nextUrl.pathname.startsWith("/auth")) {
            console.log("REDIRECTING TO DASHBOARD BECAUSE USER IS LOGGED IN");
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}

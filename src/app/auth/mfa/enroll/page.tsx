import { enrollMFA } from "../../actions";
import EnrollMFA from "../../components/mfa/EnrollMFA";
import TopNavHeader from "../../components/TopNavHeader";
export default async function EnrollMFAPage() {
    const { factorId, qrCode, secret } = await enrollMFA();

    // const factorId = "123";
    // const qrCode = "123";

    return (
        <div className="flex flex-col justify-center h-full">
            <TopNavHeader
                title="Two-Factor Authentication"
                backLink="/auth/mfa/start"
            />
            <EnrollMFA secret={secret} factorId={factorId} qrCode={qrCode} />
        </div>
    );
}

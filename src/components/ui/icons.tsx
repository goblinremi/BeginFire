import { LucideProps } from "lucide-react";

export const Icons = {
    google: (props: LucideProps) => (
        <svg role="img" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
        </svg>
    ),
    lock: (props: LucideProps) => (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M16.25 6.25H13.75V4.375C13.75 3.38044 13.3549 2.42661 12.6517 1.72335C11.9484 1.02009 10.9946 0.625 10 0.625C9.00544 0.625 8.05161 1.02009 7.34835 1.72335C6.64509 2.42661 6.25 3.38044 6.25 4.375V6.25H3.75C3.41848 6.25 3.10054 6.3817 2.86612 6.61612C2.6317 6.85054 2.5 7.16848 2.5 7.5V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V7.5C17.5 7.16848 17.3683 6.85054 17.1339 6.61612C16.8995 6.3817 16.5815 6.25 16.25 6.25ZM7.5 4.375C7.5 3.71196 7.76339 3.07607 8.23223 2.60723C8.70107 2.13839 9.33696 1.875 10 1.875C10.663 1.875 11.2989 2.13839 11.7678 2.60723C12.2366 3.07607 12.5 3.71196 12.5 4.375V6.25H7.5V4.375Z"
                fill="currentColor"
            />
        </svg>
    ),
    starBox: (props: LucideProps) => (
        <svg viewBox="0 0 48 48" fill="none" {...props}>
            <rect width="48" height="48" rx="8" fill="currentColor" />
            <path
                d="M34.5 24C34.5024 24.3076 34.4089 24.6083 34.2324 24.8604C34.056 25.1124 33.8055 25.3032 33.5156 25.4062L27.5681 27.5691L25.4062 33.5156C25.2997 33.8027 25.1078 34.0503 24.8565 34.2251C24.6051 34.3999 24.3062 34.4936 24 34.4936C23.6938 34.4936 23.3949 34.3999 23.1435 34.2251C22.8922 34.0503 22.7003 33.8027 22.5937 33.5156L20.4319 27.5681L14.4844 25.4062C14.1973 25.2997 13.9497 25.1078 13.7749 24.8565C13.6001 24.6051 13.5063 24.3062 13.5063 24C13.5063 23.6938 13.6001 23.3949 13.7749 23.1435C13.9497 22.8922 14.1973 22.7003 14.4844 22.5937L20.4319 20.4319L22.5937 14.4844C22.7003 14.1973 22.8922 13.9497 23.1435 13.7749C23.3949 13.6001 23.6938 13.5063 24 13.5063C24.3062 13.5063 24.6051 13.6001 24.8565 13.7749C25.1078 13.9497 25.2997 14.1973 25.4062 14.4844L27.5691 20.4319L33.5156 22.5937C33.8055 22.6968 34.056 22.8876 34.2324 23.1396C34.4089 23.3916 34.5024 23.6924 34.5 24Z"
                fill="white"
            />
        </svg>
    ),
    checkCircle: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 20 20" fill="none">
            <path
                d="M13.5672 7.68281C13.6253 7.74086 13.6714 7.80979 13.7029 7.88566C13.7343 7.96154 13.7505 8.04287 13.7505 8.125C13.7505 8.20713 13.7343 8.28846 13.7029 8.36434C13.6714 8.44021 13.6253 8.50914 13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.6247 12.8098 7.5786 12.8857 7.54715C12.9615 7.5157 13.0429 7.49951 13.125 7.49951C13.2071 7.49951 13.2885 7.5157 13.3643 7.54715C13.4402 7.5786 13.5091 7.6247 13.5672 7.68281ZM18.125 10C18.125 11.607 17.6485 13.1779 16.7557 14.514C15.8629 15.8502 14.594 16.8916 13.1093 17.5065C11.6247 18.1215 9.99099 18.2824 8.4149 17.9689C6.8388 17.6554 5.39106 16.8815 4.25476 15.7452C3.11846 14.6089 2.34463 13.1612 2.03112 11.5851C1.71762 10.009 1.87852 8.37535 2.49348 6.8907C3.10844 5.40605 4.14985 4.1371 5.486 3.24431C6.82214 2.35152 8.39303 1.875 10 1.875C12.1542 1.87727 14.2195 2.73403 15.7427 4.25727C17.266 5.78051 18.1227 7.84581 18.125 10ZM16.875 10C16.875 8.64025 16.4718 7.31104 15.7164 6.18045C14.9609 5.04987 13.8872 4.16868 12.631 3.64833C11.3747 3.12798 9.99238 2.99183 8.65876 3.2571C7.32514 3.52237 6.10013 4.17716 5.13864 5.13864C4.17716 6.10013 3.52238 7.32513 3.2571 8.65875C2.99183 9.99237 3.12798 11.3747 3.64833 12.6309C4.16868 13.8872 5.04987 14.9609 6.18046 15.7164C7.31105 16.4718 8.64026 16.875 10 16.875C11.8227 16.8729 13.5702 16.1479 14.8591 14.8591C16.1479 13.5702 16.8729 11.8227 16.875 10Z"
                fill="currentColor"
            />
        </svg>
    ),
    arrowLeft: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 20 20" fill="none">
            <path
                d="M16.875 10H3.125M3.125 10L8.75 15.625M3.125 10L8.75 4.375"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    x: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 20 20" fill="none">
            <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
};

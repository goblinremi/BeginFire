import { StepHeader } from "../components/StepHeader";

const KYCStepsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <StepHeader />
            <div className="bg-flex flex-col justify-between h-full py-12">
                {children}
            </div>
        </div>
    );
};

export default KYCStepsLayout;

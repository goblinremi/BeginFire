const BottomModalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-primary-superlight">
            <div className="h-[40%] flex items-center justify-center">
                image
            </div>
            <div className="bg-white flex-1 min-h-1/2 border-offwhite border-t-[1px] rounded-t-4xl px-4 py-12">
                {children}
            </div>
        </div>
    );
};

export default BottomModalLayout;

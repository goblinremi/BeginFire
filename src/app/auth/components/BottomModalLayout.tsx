const BottomModalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col w-screen h-screen absolute top-0 left-0 bg-primary-superlight">
            <div className="flex-1 flex items-center justify-center">image</div>
            <div className="bg-white flex-1 min-h-fit border-offwhite border-t-[1px] rounded-t-4xl px-4 py-12">
                {children}
            </div>
        </div>
    );
};

export default BottomModalLayout;

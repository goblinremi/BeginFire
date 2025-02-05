import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
const StorybookPage = () => {
    return (
        <div className="h-screen w-full flex-col gap-y-4 flex items-center justify-center bg-slate-500">
            <div className="flex flex-col gap-4 w-1/3">
                <h1 className="text-2xl font-bold">Buttons</h1>
                <div className="flex  flex-col gap-4">
                    <Button size="lg">Click me</Button>
                    <Button size="lg" variant="secondary">
                        Click me
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-1/3">
                <h1 className="text-2xl font-bold">Inputs</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Label</p>
                        <Input placeholder="Placeholder" />
                        <p className="text-xs text-placeholder">
                            Supporting text
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Label</p>
                        <Input placeholder="Placeholder" />
                        <p className="text-xs text-error">Error text</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-1/3">
                <h1 className="text-2xl font-bold">Security Inputs</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Label</p>
                        <div className="relative">
                            <Icons.lock className="w-5 h-5 text-primary absolute left-4 top-4" />
                            <Input
                                placeholder="Placeholder"
                                className="pl-11"
                            />
                        </div>
                        <p className="text-xs text-placeholder">
                            Supporting text
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Label</p>
                        <div className="relative">
                            <Icons.lock className="w-5 h-5 text-primary absolute left-4 top-4" />
                            <Input
                                placeholder="Placeholder"
                                className="pl-11"
                            />
                        </div>
                        <p className="text-xs text-error">Error text</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorybookPage;

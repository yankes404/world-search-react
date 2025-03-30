import { LoaderIcon, LucideProps } from "lucide-react";

import { cn } from "../../lib/utils";

function LoadingIndicator ({ className, ...props }: LucideProps) {
    return (
        <LoaderIcon
            className={cn("size-4 text-neutral-600 animate-spin mx-auto", className)}
            {...props}
        />
    )
}

export { LoadingIndicator }
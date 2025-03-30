import { cn } from "../../lib/utils";

function Hint ({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("px-3 py-2 rounded-xl text-sm bg-neutral-100 border border-neutral-200 text-neutral-600 shadow-xs", className)}
            {...props}
        >
            {children}
        </div>
    )
}

export { Hint }
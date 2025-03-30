import { cn } from "../../lib/utils";

function Input ({ className, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            className={cn("py-2 px-3 rounded-md shadow-sm border w-full bg-white border-neutral-200 text-sm text-black placeholder:text-neutral-600 outline-none focus-visible:shadow-md disabled:pointer-events-none disabled:opacity-50", className)}
            {...props}
        />
    )
}

export { Input }
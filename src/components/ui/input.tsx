import { forwardRef } from "react";

import { cn } from "../../lib/utils";

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({
    className,
    ...props
}, ref) => (
    <input
        ref={ref}
        className={cn("py-2 px-3 rounded-md shadow-sm border w-full bg-white border-neutral-200 text-sm text-black placeholder:text-neutral-600 outline-none focus-visible:shadow-md disabled:pointer-events-none disabled:opacity-50", className)}
        {...props}
    />
))

Input.displayName = "Input";

export { Input }
import { cn } from "../lib/utils";

interface Props {
    name: string;
    isSelected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export const RegionButton = ({
    name,
    isSelected,
    disabled,
    onClick
}: Props) => (
    <button
        onClick={onClick}
        className={cn("capitalize py-1 px-3 rounded-md font-semibold text-sm shadow w-full transition cursor-pointer disabled:pointer-events-none disabled:opacity-50", isSelected ? "bg-black text-white" : "border border-neutral-200 hover:bg-neutral-200")}
        disabled={disabled}
        aria-label={`${isSelected ? "Deselct" : "Select"} ${name}`}
    >
        {name}
    </button>
)
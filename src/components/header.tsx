import { SearchIcon } from "lucide-react";

import { Region } from "../types";
import { Input } from "./ui/input";
import { ALL_REGIONS } from "../constants";
import { RegionButton } from "./region-button";

interface Props {
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    isPending?: boolean;
    selectedRegions?: Region[];
    onRegionClick?: (region: Region) => void;
}

export const Header = ({
    searchValue,
    onSearchValueChange,
    isPending,
    selectedRegions,
    onRegionClick
}: Props) => (
    <header className="w-full bg-gray-100 flex flex-col items-center gap-6">
        <div className="p-6">
            <h2 className="text-lg font-bold">
                WorldSearch
            </h2>
        </div>
        <div className="pb-12 flex flex-col gap-2.5 w-full max-w-[600px] px-8">
            {typeof searchValue === "string" && (
                <div className="w-full relative">
                    <SearchIcon
                        className="size-4 text-neutral-600 absolute top-1/2 left-4 -translate-y-1/2"
                    />
                    <Input
                        type="search"
                        value={searchValue}
                        onChange={onSearchValueChange ? (e) => onSearchValueChange(e.currentTarget.value) : undefined}
                        placeholder="Search by country name..."
                        className="ps-10"
                        disabled={isPending}
                    />
                </div>
            )}
            {Array.isArray(selectedRegions) && (
                <div className="w-full grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
                    {ALL_REGIONS.map((region) => (
                        <RegionButton
                            name={region}
                            isSelected={selectedRegions.includes(region)}
                            disabled={isPending}
                            onClick={onRegionClick ? () => onRegionClick(region) : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    </header>
)
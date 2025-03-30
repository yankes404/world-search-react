import type { Country as Props } from "../types";
import { CountryImage } from "./country-image";

export const CountryCard = ({
    name,
    region,
    capitalCity,
    population,
    flagUrl,
    googleMaps
}: Props) => (
    <a
        href={googleMaps}
        target="_blank"
        className="p-3 h-full rounded-lg border border-neutral-200 shadow-sm flex flex-col gap-2 hover:opacity-80 transition overflow-hidden"
    >
        <CountryImage
            url={flagUrl}
            name={name}
        />
        <div className="w-full">
            <h3 className="font-semibold line-clamp-2 break-words">
                {name}
                <span className="text-xs text-neutral-600 ml-1">
                    ({capitalCity})
                </span>
            </h3>
            <div className="mt-0.5 text-xs font-medium text-neutral-600 flex items-center gap-1.5">
                <span className="capitalize">
                    {region}
                </span>
                <div className="size-1 rounded-full bg-neutral-600" />
                <span>
                    {population.toLocaleString("en-US")}&nbsp;residents
                </span>
            </div>
        </div>
    </a>
) 
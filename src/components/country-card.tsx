import type { Country as Props } from "../types";

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
        className="p-3 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-center gap-2 hover:opacity-80 transition overflow-hidden"
    >
        <img
            src={flagUrl}
            alt={`Flag of ${name}`}
            className="w-full h-24 object-cover object-center rounded-lg"
        />
        <div className="w-full">
            <h3 className="font-semibold">
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
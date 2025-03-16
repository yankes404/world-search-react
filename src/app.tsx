import { useEffect, useMemo, useState, useTransition } from "react";
import { LoaderIcon, SearchIcon } from "lucide-react";

import { Country, Region, ResponseCountry } from "./types";
import { useDebounce } from "./hooks/use-debounce";
import { Input } from "./components/ui/input";
import { CountryCard } from "./components/country-card";
import { cn } from "./lib/utils";

const API_URL = "https://restcountries.com/v3.1/all";
const ALL_REGIONS = [
    Region.AFRICA,
    Region.AMERICAS,
    Region.ANTARCTIC,
    Region.ASIA,
    Region.EUROPE,
    Region.OCEANIA
]

export const App = () => {
    const [countiers, setCountries] = useState<Country[]>([]);
    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);

    const [regions, setRegions] = useState<Region[]>(ALL_REGIONS);

    const handleRegionClick = (region: Region) => setRegions((prev) => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);

    const searchedCountries = useMemo(() => 
        countiers.filter((country) => country.name.toLowerCase().includes(debouncedSearch.toLowerCase()) && regions.includes(country.region)),
    [countiers, debouncedSearch, regions]);

    useEffect(() => {
        startTransition(() => {
            fetch(API_URL)  
                .then((res) => res.json())
                .then((data) => setCountries(
                    data.map((country: ResponseCountry) => ({
                        name: country.name.common,
                        region: country.region as Region,
                        capitalCity: country.capital,
                        population: country.population,
                        flagUrl: country.flags.svg,
                        googleMaps: country.maps.googleMaps
                    }) as Country)
                ))
                .catch(() => setError(true))
        });
    }, []);

    return (
        <>
            <div className="w-full bg-gray-100 flex flex-col items-center gap-6">
                <header className="p-6">
                    <h2 className="text-lg font-bold">
                        WorldSearch
                    </h2>
                </header>
                <div className="pb-12 flex flex-col gap-2.5 w-full max-w-[600px] px-8">
                    <div className="w-full relative">
                            <SearchIcon
                                className="size-4 text-neutral-600 absolute top-1/2 left-4 -translate-y-1/2"
                            />
                            <Input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.currentTarget.value)}
                                placeholder="Search by country name..."
                                className="ps-10"
                                disabled={isPending}
                            />
                        </div>
                    <div className="w-full grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
                        {ALL_REGIONS.map((region) => (
                            <button
                                onClick={() => handleRegionClick(region)}
                                className={cn("capitalize py-1 px-3 rounded-md font-semibold text-sm shadow w-full transition cursor-pointer disabled:pointer-events-none disabled:opacity-50", regions.includes(region) ? "bg-black text-white" : "border border-neutral-200 hover:bg-neutral-200")}
                                disabled={isPending}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 w-full px-8 md:px-12 lg:px-16 xl:px-24">
                {isPending ? (
                    <LoaderIcon className="size-4 text-neutral-600 animate-spin mx-auto" />
                ) : error ? (
                    <p className="font-medium text-sm">
                        Something went wrong. Please try again later
                    </p>
                ) : searchedCountries.length > 0 ? (
                        <>
                            <p className="text-sm font-medium">Found <span className="font-semibold">{searchedCountries.length.toLocaleString("en-US")}</span>&nbsp;countries</p>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 mt-4">
                                {searchedCountries.map((country, key) => (
                                    <CountryCard
                                        key={key}
                                        {...country}
                                    />
                                ))}
                            </div>
                        </>
                ) : (
                    <p className="text-sm font-medium">
                        No countries
                    </p>
                )}
            </div>
            <footer className="mt-12 p-4 w-screen bg-gray-100 text-sm font-medium text-neutral-600 flex justify-between items-center gap-4">
                <p>
                    WorldSearch. Open-Source project,&nbsp;<a href="#" className="text-black hover:underline">visit GitHub repository</a>
                </p>
                <p>
                    Created by <a href="#" className="text-black hover:underline">yankes404</a>
                </p>
            </footer>
        </>
    )
}
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

import { Region } from "./types";
import { useDebounce } from "./hooks/use-debounce";
import { CountryCard } from "./components/country-card";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { ALL_REGIONS } from "./constants";
import { useCountries } from "./hooks/use-countries";
import { useSearch } from "./hooks/use-search";

export const App = () => {
    const {
        countries,
        error,
        isPending
    } = useCountries();

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);

    const [regions, setRegions] = useState<Region[]>(ALL_REGIONS);

    const handleRegionClick = (region: Region) => setRegions((prev) => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);

    const searchedCountries = useSearch(
        countries,
        { search: debouncedSearch, regions },
        ((country, { search, regions }) => country.name.toLowerCase().includes(search.toLowerCase()) && regions.includes(country.region))
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                isPending={isPending}
                selectedRegions={regions}
                onRegionClick={handleRegionClick}
            />
            <main className="mt-8 w-full px-8 md:px-12 lg:px-16 xl:px-24 flex-grow">
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
            </main>
            <Footer />
        </div>
    )
}
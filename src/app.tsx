import { useState } from "react";

import { Region } from "./types";
import { useDebounce } from "./hooks/use-debounce";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { ALL_REGIONS } from "./constants";
import { useCountries } from "./hooks/use-countries";
import { useSearch } from "./hooks/use-search";
import { CountryList } from "./components/country-list";
import { Hint } from "./components/ui/hint";
import { LoadingIndicator } from "./components/ui/loading-indicator";

export const App = () => {
    const {
        countries,
        error,
        isPending
    } = useCountries();

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);

    const [selectedRegions, setSelectedRegions] = useState<Region[]>(ALL_REGIONS);

    const handleRegionClick = (region: Region) => setSelectedRegions((prev) => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);

    const searchedCountries = useSearch(
        countries,
        { search: debouncedSearch, selectedRegions },
        ((country, { search, selectedRegions }) => country.name.toLowerCase().includes(search.toLowerCase()) && selectedRegions.includes(country.region))
    );

    const shouldDisplayCountries = searchedCountries.length > 0 && !error && !isPending;
    const shouldDisplayError = !isPending && error;
    const shouldDisplayLoading = isPending;
    const noCountriesToDisplay = !shouldDisplayCountries && !shouldDisplayError && !shouldDisplayLoading;

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                isPending={isPending}
                selectedRegions={selectedRegions}
                onRegionClick={handleRegionClick}
            />
            <main className="mt-8 w-full px-8 md:px-12 lg:px-16 xl:px-24 flex-grow flex flex-col items-start">
                {shouldDisplayLoading && <LoadingIndicator />}
                {shouldDisplayError && <Hint>Something went wrong. Please try again later</Hint>}
                {shouldDisplayCountries && <CountryList countries={searchedCountries} />}
                {noCountriesToDisplay && <Hint>No countries found</Hint>}
            </main>
            <Footer />
        </div>
    )
}
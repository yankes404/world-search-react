import { useEffect, useState, useTransition } from "react";
import { API_URL } from "../constants";
import { Country, Region, ResponseCountry } from "../types";

export const useCountries = () => {
    const [data, setData] = useState<Country[]>([]);
    const [error, setError] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            fetch(API_URL)  
                .then((res) => res.json())
                .then((data) => setData(
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

    return {
        countries: data,
        error,
        isPending
    }
}
import { CountryCard } from "./country-card";
import { Country } from "../types";
import { Hint } from "./ui/hint";

interface Props {
    countries: Country[];
}

export const CountryList = ({ countries }: Props) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <Hint>
                Found <span className="text-black"><span className="font-semibold">{countries.length.toLocaleString("en-US")}</span>&nbsp;countries</span>
            </Hint>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                {countries.map((country, key) => (
                    <li className="h-full">
                        <CountryCard
                            key={key}
                            {...country}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
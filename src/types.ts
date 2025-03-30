import { ALL_REGIONS } from "./constants";

export type Region = (typeof ALL_REGIONS)[number];

export type Country = {
    name: string;
    region: Region;
    capitalCity: string;
    population: number;
    flagUrl: string;
    googleMaps: string;
}

export type ResponseCountry = {
    name: {
        common: string;
    },
    region: string;
    capital: string;
    population: number;
    flags: {
        svg: string;
    };
    maps: {
        googleMaps: string;
    }
}
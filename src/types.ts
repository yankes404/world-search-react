export enum Region {
    ANTARCTIC = "Antarctic",
    AMERICAS = "Americas",
    EUROPE = "Europe",
    AFRICA = "Africa",
    ASIA = "Asia",
    OCEANIA = "Oceania",
}

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
import { useMemo } from "react";

export const useSearch = <T, K>(
    data: Array<T>,
    searchValue: K,
    filterFunction: (row: T, searchValue: K) => boolean
) => {
    const searchedData = useMemo(() => 
        data.filter((row) => filterFunction(row, searchValue)),
    [data, searchValue]);

    return searchedData;
}
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export const fuseSearch = <T>(
  searchText: string,
  options: T[],
  searchKeys: string[]
) => {
  const fuseOptions = {
    keys: searchKeys,
    threshold: 0.3,
    includeScore: false,
  };

  if (searchText.length === 0) return options;

  const fuse = new Fuse(options, fuseOptions);
  return fuse.search(searchText).map((res) => res.item);
};

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().includes(searchText.toLowerCase());

const defaultSearch = <T>(
  searchText: string,
  options: T[],
  searchKeys: (keyof T)[]
) =>
  options.filter((option) =>
    searchKeys.some((key) => {
      const value = option[key];

      if (Array.isArray(value)) {
        return value.some((item) =>
          Object.values(item).some((v) => {
            if (typeof v === "string") return containsText(v, searchText);
            if (typeof v === "number")
              return containsText(v.toString(), searchText);
            return false;
          })
        );
      }

      if (typeof value === "string") return containsText(value, searchText);
      if (typeof value === "number")
        return containsText(value.toString(), searchText);
      return false;
    })
  );

const useSearch = <T>(
  searchKey: keyof T | (keyof T)[],
  options: T[] = [],
  debounceTime = 100,
  searchFunction = defaultSearch
) => {
  if (!searchKey) {
    throw new Error("searchKey is required");
  }

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const optionsRef = useRef(options);
  const lastSearchText = useRef(searchText);

  useEffect(() => {
    optionsRef.current = options;
    setFilteredOptions(options);
  }, [options]);

  const searchKeys = useMemo(
    () => (Array.isArray(searchKey) ? searchKey : [searchKey]),
    [searchKey]
  );

  const stableSearchFunction = useCallback(
    (text: string) => {
      if (lastSearchText.current === text) return;

      const filtered = searchFunction(text, optionsRef.current, searchKeys);
      lastSearchText.current = text;
      setFilteredOptions(filtered);
    },
    [searchFunction, searchKeys]
  );

  const debouncedSearchRef = useRef(
    debounce((text: string) => {
      stableSearchFunction(text);
    }, debounceTime)
  );

  useEffect(() => {
    debouncedSearchRef.current(searchText);
  }, [searchText]);

  useEffect(() => () => debouncedSearchRef.current.cancel(), []);

  return {
    searchText,
    setSearchText,
    filteredOptions,
  };
};

export default useSearch;

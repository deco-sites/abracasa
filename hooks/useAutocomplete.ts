import { signal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";
import { invoke } from "../runtime.ts";
import type { Suggestion } from "apps/commerce/types.ts";

const payload = signal<Suggestion | null>(null);
const loading = signal<boolean>(false);

const suggestions = invoke.vtex.loaders.legacy.suggestions;
const listLoader = invoke.vtex.loaders.legacy.productList;

const setSearch = debounce(async (search: string) => {
  try {
    const params: { query?: string; count: number } = { count: 10 };
    if (search !== "") params.query = search;

    const availableSuggestions = await suggestions(
      params,
    );

    if (availableSuggestions && availableSuggestions.products) {
      const skuIds = availableSuggestions?.products?.filter((item) => item.sku)
        .map((item) => item.sku);

      const products = await listLoader({
        props: {
          ids: skuIds,
          count: skuIds?.length || 10,
        },
      });

      payload.value = {
        products: products || [],
        searches: availableSuggestions.searches || [],
      };
    }
  } catch (error) {
    console.error("Something went wrong while fetching suggestions \n", error);
  } finally {
    loading.value = false;
  }
}, 250);

const state = {
  setSearch: (s: string) => {
    loading.value = true;
    setSearch(s);
  },
  loading,
  suggestions: payload,
};

/**
 * This hook only works if the vtex intelligent search app is installed at VTEX Account.
 */
export const useAutocomplete = () => state;

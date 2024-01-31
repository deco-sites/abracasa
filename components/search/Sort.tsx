import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Maior Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Menor Relevância",
  "discount:desc": "Maior Desconto",
};

function Sort(
  { sortOptions, isMobile = false }: Props & { isMobile?: boolean },
) {
  const sort = useSort();

  const filteredSortOptions = sortOptions.filter(
    ({ label }) =>
      label !== "name:desc" && label !== "name:asc" &&
      label !== "release:desc" && label !== "",
  );

  if (isMobile) {
    const applySortOnMobile = (value: string) => {
      const urlSearchParams = new URLSearchParams(window.location.search);

      urlSearchParams.set(SORT_QUERY_PARAM, value);
      window.location.search = urlSearchParams.toString();
    };

    return (
      <>
        {filteredSortOptions?.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <button
            key={value}
            value={value}
            selected={value === sort}
            onClick={() => applySortOnMobile(value)}
            aria-label={`ordenar por ${label}`}
            class={`${
              value === sort && "text-firebrick font-bold"
            } text-center`}
          >
            {label}
          </button>
        ))}
      </>
    );
  }

  return (
    <select
      id="sort"
      name="sort"
      aria-label="sort options"
      onInput={applySort}
      class="w-[90px] h-full rounded-[2px] text-base-content cursor-pointer outline-none px-0.5 bg-white"
    >
      <option value="" hidden class="text-[25px]">
        Ordenar
      </option>
      {filteredSortOptions?.map(({ value, label }) => ({
        value,
        label: portugueseMappings[label as keyof typeof portugueseMappings] ??
          label,
      })).filter(({ label }) => label).map(({ value, label }) => (
        <option key={value} value={value}>
          <span class="text-sm py-2.5 text-center">{label}</span>
        </option>
      ))}
    </select>
  );
}

export default Sort;

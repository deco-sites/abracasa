import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM_LEGACY = "O";
const SORT_QUERY_PARAM_INTELLIGENT = "sort";

const useSort = (sortParam?: "legacy" | "intelligent") =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(globalThis.location?.search);
    const queryParam = sortParam === "intelligent"
      ? SORT_QUERY_PARAM_INTELLIGENT
      : SORT_QUERY_PARAM_LEGACY;

    return urlSearchParams.get(queryParam) ?? "";
  }, [sortParam]);

const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>, sortParam?: "legacy" | "intelligent") => {
  const urlSearchParams = new URLSearchParams(globalThis.location.search);

  const queryParam = sortParam === "intelligent"
    ? SORT_QUERY_PARAM_INTELLIGENT
    : SORT_QUERY_PARAM_LEGACY;

  urlSearchParams.set(queryParam, e.currentTarget.value);
  globalThis.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  sortParam?: "legacy" | "intelligent";
  isMobile?: boolean;
};

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Maior Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamentos",
  "discount:desc": "Maior Desconto",
};

function Sort(
  { sortParam = "legacy", sortOptions, isMobile = false }: Props & { isMobile?: boolean },
) {
  const sort = useSort(sortParam);

  const filteredSortOptions = sortOptions.filter(
    ({ label }) =>
      label !== "name:desc" && label !== "name:asc" && label !== "",
  );

  if (isMobile) {
    const applySortOnMobile = (value: string) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const queryParam = sortParam === "intelligent"
        ? SORT_QUERY_PARAM_INTELLIGENT
        : SORT_QUERY_PARAM_LEGACY;

      urlSearchParams.set(queryParam, value);
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
            class={`${value === sort && "text-firebrick font-bold"
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
      onInput={(e) => applySort(e, sortParam)}
      class="OrderPlp w-[145px] h-full rounded-[2px] text-base-content text-[13px] cursor-pointer outline-none px-0.5 py-[6px] lg:w-full lg:max-w-[134px] lg:px-[13px] lg:p-[15px] lg:pb-[13px]"
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

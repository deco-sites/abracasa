import Avatar from "$store/components/ui/Avatar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
  isCategoriesFilterActive?: boolean;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul
      style={{
        top: "55px",
      }}
      class={`flex flex-wrap flex-col dropdown-content z-[999999] py-6 px-3 shadow bg-base-100 rounded-none gap-2 min-w-[35vw] overflow-auto w-full h-[280px] !left-0 border-y border-solid border-[#d9d9d9]`}
    >
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, isCategoriesFilterActive }: Props) {
  const excludedKeys = [
    "Brands",
    "PriceRanges",
    "Departments",
    "Categories",
    "SITE ANTIGO",
    "produtossimilares",
    "price",
    "brand",
  ];

  const translations: Record<string, string> = {
    "Categories": "Categorias",
    "Departments": "Departamentos",
    "Brands": "Marcas",
  };

  return (
    <ul class="flex flex-wrap flex-row gap-3">
      {filters
        .filter(isToggle)
        .filter((item) =>
          !isCategoriesFilterActive
            ? !excludedKeys.includes(item.key)
            : !excludedKeys.concat("Designers").includes(item.key)
        )
        .map((filter) => {
          if (!filter.values || filter.values.length === 0) return null;

          return (
            <li class="flex flex-col gap-4 dropdown dropdown-end">
              <div
                aria-label={`open ${filter.label}`}
                tabIndex={0}
                role="button"
                class="flex items-center justify-center border px-1.5 h-[48px] text-[13px] leading-[22px] text-dimgray font-normal bg-transparent hover:bg-transparent m-1 gap-1.5 w-full"
              >
                <span class="capitalize">
                  {translations[filter.label] || filter.label}
                </span>
                <Icon
                  id="ChevronDown"
                  size={24}
                  strokeWidth={2}
                  loading="lazy"
                />
              </div>
              <FilterValues {...filter} />
            </li>
          );
        })}
    </ul>
  );
}

export default Filters;

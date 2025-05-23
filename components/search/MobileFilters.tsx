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
  hiddenFilters?: string[];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 px-4">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class="flex flex-wrap gap-6 flex-col">
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
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

function Filters(
  { filters, isCategoriesFilterActive, hiddenFilters = [] }: Props,
) {
  const translations: Record<string, string> = {
    "Categories": "Categorias",
    "Departments": "Departamentos",
    "Brands": "Marcas",
  };

  return (
    <div class="flex flex-col gap-6 pt-4">
      {filters
        .filter(isToggle)
        .filter((item) =>
          !isCategoriesFilterActive || item.label === "Categoria"
        )
        .map((filter) => {
          if (!filter.values || filter.values.length === 0) return null;
          if (hiddenFilters.includes(filter.label.toLowerCase())) {
            return null;
          }
          return (
            <div class="collapse rounded-none">
              <input
                type="checkbox"
                name="pdc-filters"
                class="min-h-[0px]"
                aria-label="Filtros"
                checked={filter.values.some((item) => item.selected === true)}
              />

              <div class="flex justify-between collapse-title uppercase font-bold p-0 min-h-[0px] px-4 w-full">
                <span>{translations[filter.label] || filter.label}</span>
                <Icon
                  id="ChevronDown"
                  size={24}
                  strokeWidth={1.75}
                />
              </div>

              <div class="collapse-content flex flex-col gap-4 p-0 mt-2 !pt-4 bg-[#f2f2f2] !rounded-none">
                <FilterValues {...filter} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Filters;

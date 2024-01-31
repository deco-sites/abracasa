import Avatar from "$store/components/ui/Avatar.tsx";
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
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
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
        const { url, selected, value, quantity } = item;

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

function Filters({ filters }: Props) {
  const excludedKeys = ["Brands", "PriceRanges", "Categories", "Departments"];

  return (
    <div class="flex flex-col gap-6 pt-4">
      {filters
        .filter(isToggle)
        .filter((item) => !excludedKeys.includes(item.key))
        .map((filter) => (
          <div class="collapse collapse-arrow rounded-none">
            <input
              type="checkbox"
              name="pdc-filters"
              class="min-h-[0px]"
              aria-label="Filtros"
              checked={filter.values.some((item) => item.selected === true)}
            />

            <div class="collapse-title uppercase font-bold p-0 min-h-[0px] px-4">
              {filter.label}
            </div>

            <div class="collapse-content flex flex-col gap-4 p-0 mt-2 !pt-4 bg-[#f2f2f2] !rounded-none">
              <FilterValues {...filter} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Filters;

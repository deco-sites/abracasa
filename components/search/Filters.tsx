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
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
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
      class={`block dropdown-content z-[999999] py-6 px-3 shadow bg-base-100 rounded-none gap-2 w-[50vw] min-w-[120px] h-[300px] !left-0 overflow-auto border-y border-solid border-[#d9d9d9]`}
    >
      <div class={`flex flex-wrap h-full w-full gap-1.5 flex-col`}>
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
      </div>
    </ul>
  );
}

function Filters({ filters }: Props) {
  const excludedKeys = ["Brands", "PriceRanges", "Categories", "Departments"];

  return (
    <ul class="flex flex-row gap-3">
      {filters
        .filter(isToggle)
        .filter((item) => !excludedKeys.includes(item.key))
        .map((filter) => (
          <li class="flex flex-col gap-4 dropdown dropdown-end">
            <div
              aria-label={`open ${filter.label}`}
              tabIndex={0}
              role="button"
              class="btn text-sm leading-[22px] text-[#555] font-normal bg-transparent hover:bg-transparent m-1 gap-1.5 w-full"
            >
              <span class="visible:text-firebrick ">{filter.label}</span>
              <Icon id="ChevronDown" size={24} strokeWidth={2} loading="lazy" />
            </div>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;

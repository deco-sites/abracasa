import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import MobileFilters from "$store/components/search/MobileFilters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  const removeSort = () => {
    const currentUrl = new URL(window?.location?.href);

    currentUrl.search = "";

    window.location.href = currentUrl.toString();
  };

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-semibold text-2xl text-firebrick">
                  Filtrar
                </span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <MobileFilters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex w-full sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-col justify-between container h-full w-full p-4 mb-4 sm:flex-row sm:mb-0 sm:p-0 sm:gap-4">
          {/* Mobile Filters */}
          <div class="flex lg:hidden flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
            <Button
              class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
              onClick={() => {
                open.value = true;
              }}
            >
              Filtrar
              <Icon id="FilterList" width={16} height={16} />
            </Button>

            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>

          {/* Desktop Filters */}
          <div class="hidden lg:flex flex-row items-center justify-between gap-2 mb-2 w-full">
            <div class="flex items-center gap-2">
              <Filters filters={filters} />
              <button
                aria-label="limpar filtros"
                onClick={removeSort}
                class="text-sm leading-[22px] text-firebrick font-normal"
              >
                Limpar filtros
              </button>
            </div>

            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;

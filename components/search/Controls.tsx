import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import MobileFilters from "$store/components/search/MobileFilters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import MobileSortButton from "$store/components/search/MobileSortButton.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import PromptDelivery from "$store/components/search/PromptDelivery.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    isCategoriesFilterActive?: boolean;
  };

const applySort = (format: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set("layout", format);

  window.location.search = urlSearchParams.toString();
};

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, isCategoriesFilterActive }:
    Props,
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
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[75%]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-bold text-2xl text-firebrick">
                  Filtrar
                </span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <MobileFilters
                filters={filters}
                isCategoriesFilterActive={isCategoriesFilterActive}
              />
            </div>
          </div>
        </>
      }
    >
      <div class="flex w-full sm:h-full sm:border-b sm:border-base-200">
        <div class="flex flex-col justify-between xl:container xl:max-w-[85%] h-full w-full p-4 mb-4 sm:flex-row sm:mb-0 sm:p-0 sm:gap-4">
          {/* Mobile Filters */}
          <div class="flex lg:hidden flex-row items-start justify-between border-b border-base-200 gap-4 sm:border-none pb-4 w-full">
            <div class="flex flex-1 items-center gap-2.5">
              <Button
                hasBtnClass={false}
                class={displayFilter
                  ? "flex items-center justify-center text-black bg-[#f2f2f2] text-[15px] w-full max-w-[80px] h-[30px] p-1"
                  : "sm:hidden"}
                onClick={() => {
                  open.value = true;
                }}
              >
                Filtrar
              </Button>

              {sortOptions.length > 0 && (
                <MobileSortButton sortOptions={sortOptions} />
              )}
            </div>

            <div class="flex flex-col sm:flex-row gap-5">
              <PromptDelivery />

              {
                /* <div class="flex items-center justify-center gap-2">
                <span class="text-normal leading-[22px] text-[#555]">
                  Visualizar:
                </span>

                <button
                  aria-label="trocar para visualização de uma coluna"
                  onClick={() => applySort("1")}
                >
                  <Icon id="OneColumn" width={12} height={24} />
                </button>

                <button
                  aria-label="trocar para visualização de duas colunas"
                  onClick={() => applySort("2")}
                >
                  <Icon id="TwoColumns" width={24} height={24} />
                </button>
              </div> */
              }
            </div>
          </div>

          {/* Desktop Filters */}
          <div class="hidden lg:flex flex-row items-center justify-between gap-2 mb-12 w-full">
            <div class="flex items-center gap-2">
              <Filters
                filters={filters}
                isCategoriesFilterActive={isCategoriesFilterActive}
              />

              <button
                aria-label="limpar filtros"
                onClick={removeSort}
                class="text-sm leading-[22px] text-firebrick font-normal"
              >
                Limpar filtros
              </button>
            </div>

            <div class="flex items-center gap-3 lg:ml-2 lg:min-w-[315px]">
              <PromptDelivery />

              {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}

              {
                /* <div class="flex items-center justify-center gap-2">
                <span class="text-normal leading-[22px] text-[#555]">
                  Visualizar:
                </span>

                <button
                  aria-label="trocar para visualização de três colunas"
                  onClick={() => applySort("3")}
                >
                  <Icon id="ThreeColumns" width={34} height={34} />
                </button>

                <button
                  aria-label="trocar para visualização de quatro colunas"
                  onClick={() => applySort("4")}
                >
                  <Icon id="FourthColumns" width={34} height={34} />
                </button>
              </div> */
              }
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;

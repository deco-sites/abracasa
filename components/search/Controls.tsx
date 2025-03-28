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
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & {
    sortParam?: "legacy" | "intelligent";
    displayFilter?: boolean;
    isCategoriesFilterActive?: boolean;
    hiddenFilters?: string[];
  };

export default function SearchControls({
  filters,
  sortParam,
  displayFilter,
  sortOptions,
  isCategoriesFilterActive,
  hiddenFilters = [],
}: Props) {
  const open = useSignal(false);
  const currentUrl = useSignal("");

  useEffect(() => {
    if (IS_BROWSER) {
      currentUrl.value = globalThis?.location?.href;
    }
  }, []);

  const removeSort = () => {
    const cleanUrl = new URL(currentUrl.value);
    cleanUrl.search = "";

    globalThis.location.href = cleanUrl.toString();
  };

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => (open.value = false)}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[75%]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-bold text-2xl text-firebrick">Filtrar</span>
              </h1>
              <Button
                class="btn btn-ghost"
                onClick={() => (open.value = false)}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <MobileFilters
                filters={filters}
                isCategoriesFilterActive={isCategoriesFilterActive}
                hiddenFilters={hiddenFilters}
              />
            </div>
          </div>
        </>
      }
    >
      <div class="flex w-full sm:h-full sm:border-t sm:border-base-200">
        <div class="flex flex-col justify-between xl:container xl:max-w-[85%] h-full w-full sm:flex-row sm:mb-0 sm:p-0 sm:gap-4">
          {/* Mobile Filters */}
          <div class="flex lg:hidden flex-row items-start gap-2 border-b border-base-200 sm:border-none pb-4 w-full">
            <div class="flex items-center gap-2">
              <Button
                hasBtnClass={false}
                class={displayFilter
                  ? "flex items-center justify-center text-[#555555] bg-[#f2f2f2] text-[15px] w-full max-w-[80px] py-2 px-[13px]"
                  : "sm:hidden flex items-center justify-center text-[#555555] bg-[#f2f2f2] text-[15px] w-full max-w-[80px] py-2 px-[13px]"}
                onClick={() => {
                  open.value = true;
                }}
              >
                Filtrar
              </Button>

              {sortOptions.length > 0 && (
                <MobileSortButton
                  sortParam={sortParam}
                  sortOptions={sortOptions}
                />
              )}
            </div>

            <div class="flex flex-col sm:flex-row gap-5 w-full max-w-[169px]">
              <PromptDelivery />
            </div>
          </div>

          {/* Desktop Filters */}
          <div class="hidden lg:flex flex-row items-center justify-between gap-2 mb-12 mt-[86px] w-full">
            <div class="flex items-center gap-4">
              <Filters
                filters={filters}
                isCategoriesFilterActive={isCategoriesFilterActive}
                hiddenFilters={hiddenFilters}
              />
              {currentUrl.value &&
                new URL(currentUrl.value).search !== "" &&
                (!new URL(currentUrl.value).searchParams.has("readyDelivery") &&
                  ((() => {
                    const searchParams = new URL(currentUrl.value).searchParams;
                    let paramCount = 0;

                    searchParams.forEach((_, key) => {
                      if (key !== "_gl" && key !== "page") {
                        paramCount++;
                      }
                    });

                    return paramCount > 0;
                  })())) &&
                (
                  <button
                    aria-label="limpar filtros"
                    onClick={removeSort}
                    class="text-[15px] lg:text-[13px] leading-[22px] text-[#494949] font-normal"
                  >
                    Limpar filtros
                  </button>
                )}
            </div>

            <div class="flex items-center gap-3 lg:ml-2 lg:min-w-[339px]">
              <PromptDelivery />

              {sortOptions.length > 0 && (
                <Sort sortParam={sortParam} sortOptions={sortOptions} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

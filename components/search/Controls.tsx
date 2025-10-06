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

export type Props = Pick<
  ProductListingPage,
  "filters" | "breadcrumb" | "sortOptions"
> & {
  sortParam?: "legacy" | "intelligent";
  displayFilter?: boolean;
  isCategoriesFilterActive?: boolean;
  hiddenFilters?: string[];
  /**
   * @ignore
   */
  dataTreePathJoined?: string;
};

export function AtelieCasaToggle() {
  const enabled = useSignal(false);

  const getCurrentUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      prontaEntrega: params.has("add") || params.has("addAtelieEntrega"),
      atelie: params.has("addAtelie") || params.has("addAtelieEntrega"),
    };
  };

  const updateUrlParams = (
    ativaProntaEntrega: boolean,
    atelieAtivo: boolean
  ) => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    urlSearchParams.delete("add");
    urlSearchParams.delete("addAtelie");
    urlSearchParams.delete("addAtelieEntrega");

    if (ativaProntaEntrega && atelieAtivo) {
      urlSearchParams.set("addAtelieEntrega", "true");
    } else {
      if (ativaProntaEntrega) {
        urlSearchParams.set("add", "prontaEntrega");
      }
      if (atelieAtivo) {
        urlSearchParams.set("addAtelie", "atelieCadabra");
      }
    }

    window.location.search = urlSearchParams.toString();
  };

  const handleClick = () => {
    const { prontaEntrega, atelie } = getCurrentUrlParams();
    updateUrlParams(prontaEntrega, !atelie);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      enabled.value = params.has("addAtelie") || params.has("addAtelieEntrega");
    }
  }, []);

  return (
    <div class="w-full flex items-center justify-between gap-2 bg-[#f2f2f2] py-[11px] px-3 lg:px-[13px] lg:py-[13px] max-w-[160px] rounded">
      <span class="leading-[22px] text-[#555555] text-[14px] lg:text-[13px] font-sans">
        Ateliê Casa
      </span>
      <button
        onClick={handleClick}
        aria-label="Toggle Ateliê Casa"
        class={`w-[38px] h-5 flex items-center rounded-full transition-all duration-300 ${
          enabled.value ? "bg-[#4E4D4D] p-1" : "bg-[#B4B4B4] p-0.5"
        }`}
      >
        <div
          class={`h-4 w-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            enabled.value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SearchControls({
  filters,
  sortParam,
  displayFilter,
  sortOptions,
  isCategoriesFilterActive,
  hiddenFilters = [],
  dataTreePathJoined,
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
          <div class="flex lg:hidden sm:mt-[15px] flex-col items-start gap-2 border-b border-base-200 sm:border-none pb-4 w-full">
            <div class="flex flex-row items-center gap-[11px] w-full">
              <Button
                hasBtnClass={false}
                class={
                  displayFilter
                    ? "flex items-center justify-between text-[#555555] bg-[#f2f2f2] text-[14px] w-full max-w-[169px] py-3 px-[11px]"
                    : "sm:hidden flex items-center justify-center text-[#555555] bg-[#f2f2f2] text-[14px] w-full max-w-[169px] py-3 px-[11px]"
                }
                onClick={() => {
                  open.value = true;
                }}
              >
                Filtrar
                <Icon
                  id="Filter"
                  width={20}
                  height={18}
                  strokeWidth={2}
                  loading="lazy"
                />
              </Button>

              {sortOptions.length > 0 && (
                <MobileSortButton
                  sortParam={sortParam}
                  sortOptions={sortOptions}
                />
              )}
            </div>

            <div class="flex flex-row sm:flex-row gap-[11px] w-full">
              {dataTreePathJoined === null ? (
                ""
              ) : (
                <>
                  <PromptDelivery />
                  <AtelieCasaToggle />
                </>
              )}
            </div>
          </div>

          <div class="hidden lg:flex flex-row items-center justify-between gap-2 mb-12 mt-[86px] w-full">
            <div class="flex items-center gap-4">
              <Filters
                filters={filters}
                isCategoriesFilterActive={isCategoriesFilterActive}
                hiddenFilters={hiddenFilters}
              />
              {currentUrl.value &&
                new URL(currentUrl.value).search !== "" &&
                !new URL(currentUrl.value).searchParams.has("readyDelivery") &&
                (() => {
                  const searchParams = new URL(currentUrl.value).searchParams;
                  let paramCount = 0;

                  searchParams.forEach((_, key) => {
                    if (key !== "_gl" && key !== "page") {
                      paramCount++;
                    }
                  });

                  return paramCount > 0;
                })() && (
                  <button
                    aria-label="limpar filtros"
                    onClick={removeSort}
                    class="text-[14px] lg:text-[13px] leading-[22px] text-[#494949] font-normal"
                  >
                    Limpar filtros
                  </button>
                )}
            </div>

            <div class="flex items-center gap-3 lg:ml-2 lg:min-w-[486px]">
              {dataTreePathJoined === null ? (
                ""
              ) : (
                <>
                  <PromptDelivery />
                  <AtelieCasaToggle />
                </>
              )}
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

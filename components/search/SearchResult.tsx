import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import SearchTitle from "$store/islands/SearchTitle.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import CustomPagination from "./CustomPagination.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex flex-col justify-center items-center gap-2 py-10">
      <span>Ops! não existe nenhum produto disponível para essa busca.</span>
      <span>Tente procurar por outro termo.</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <SearchTitle productsCount={pageInfo.records} />

      <div class="px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row mt-4 container justify-center">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex flex-col gap-6">
            <span class="text-sm text-[#828282] leading-[27px] font-normal text-end md:text-start">
              {pageInfo.records} produtos
            </span>

            <div class="flex-grow" id={id}>
              <ProductGallery
                products={products}
                offset={offset}
                layout={{ card: cardLayout, columns: layout?.columns }}
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <CustomPagination pageInfo={page?.pageInfo} />
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const layoutValue = url.searchParams.get("layout");

  const updatedLayout = {
    mobile: Number(layoutValue) || props?.layout?.columns?.mobile || 1,
    desktop: Number(layoutValue) || props?.layout?.columns?.desktop || 4,
  };

  if (url.searchParams.has("readyDelivery")) {
    const filteredProducts = props.page?.products?.filter((product) =>
      product.additionalProperty?.some((property) =>
        property.value?.includes("Pronta Entrega")
      )
    ) || null;

    return {
      ...props,
      page: { ...props.page, products: filteredProducts },
      layout: { ...props.layout, columns: updatedLayout },
    };
  }

  return {
    ...props,
    layout: { ...props.layout, columns: updatedLayout },
  };
};

function SearchResult({ page, ...props }: Props) {
  if (!page || !page.products || page.products.length === 0) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;

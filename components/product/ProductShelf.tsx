import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { AppContext } from "apps/vtex/mod.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-12 lg:gap-16 lg:py-10 relative lg:max-w-[85%]">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-2 sm:px-5"
      >
        <Slider class="flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end scrollbar gap-6 col-span-full row-start-2 row-end-5 pb-2">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[252px] lg:w-[292px]"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} scroll="smooth" />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const { products } = props;

  if (!products) return null;

  const extractSimilarLabel = (item: Product) =>
    item.isVariantOf?.additionalProperty.find((aP) =>
      aP.name === "ProdutosSimilares"
    )?.value;

  const fetchSimilarProducts = async (label: string) => {
    try {
      const fetchedProducts = await ctx.invoke.vtex.loaders.legacy
        .productListingPage({
          fq: `specificationFilter_178:${encodeURIComponent(label)}`,
          count: 20,
        });

      return fetchedProducts?.products?.filter((item) =>
        item.productID !==
          products.find((product) => extractSimilarLabel(product) === label)
            ?.productID
      ) || [];
    } catch (error) {
      console.error(`Failed to fetch products for label ${label}:`, error);
      return [];
    }
  };

  const similarsLabels = products.map(extractSimilarLabel);
  const similarsProductsPromises = similarsLabels.map((label) =>
    label !== undefined
      ? fetchSimilarProducts(label)
      : Promise.resolve(undefined)
  );

  const similarsProductsResults = await Promise.all(similarsProductsPromises);

  const updatedProducts = products.map((product, index) => ({
    ...product,
    isSimilarTo: similarsLabels[index] === undefined
      ? undefined
      : similarsProductsResults[index],
  }));

  return {
    ...props,
    products: updatedProducts,
  };
};

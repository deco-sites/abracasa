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
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface BannerImage {
  image: {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
  };
}

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Small" | "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  shelfWithBanner?: boolean;
  bannerImage?: BannerImage;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  shelfWithBanner = false,
  bannerImage,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id="4017801744-0"
      class={`w-full container ${shelfWithBanner ? "" : "py-8 lg:gap-4 lg:py-10"
        } flex flex-col gap-3 relative lg:max-w-[85%]`}
    >
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Small"}
        alignment={layout?.headerAlignment || "left"}
      />

      <div
        id={id}
        class={`grid grid-cols-[48px_1fr_48px] ${shelfWithBanner ? '' : 'pl-6 sm:px-0'}`}
      >
        <Slider class="flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end scrollbar gap-6 col-span-full row-start-2 row-end-5 pb-2">
          {shelfWithBanner && bannerImage && (
            <Slider.Item
              index={0}
              class="carousel-item w-[252px] lg:hidden lg:w-[292px]"
            >
              <div class="flex items-center justify-center h-full">
                <Image
                  src={bannerImage.image.src}
                  alt={bannerImage.image.alt}
                  width={bannerImage.image.width ?? 410}
                  height={bannerImage.image.height ?? 462}
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full"
                />
              </div>
            </Slider.Item>
          )}
          {products?.map((product, index) => (
            <Slider.Item
              index={shelfWithBanner && bannerImage ? index + 1 : index}
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
          <div
            class={`hidden sm:block z-10 col-start-1 row-start-3 absolute right-11 ${shelfWithBanner ? "top-[-38px]" : "top-[38px]"
              }`}
          >
            <Slider.PrevButton class="btn !w-8 !h-8 !min-h-8 btn-circle btn-outline bg-base-100">
              <Icon
                class="rotate-180"
                size={16}
                id="ChevronRight"
                strokeWidth={3}
              />
            </Slider.PrevButton>
          </div>
          <div
            class={`hidden sm:block z-10 col-start-3 row-start-3 absolute right-0 ${shelfWithBanner ? "top-[-38px]" : "top-[38px]"
              }`}
          >
            <Slider.NextButton class="btn !w-8 !h-8 !min-h-8 btn-circle btn-outline bg-base-100">
              <Icon size={16} id="ChevronRight" strokeWidth={3} />
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

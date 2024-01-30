import { SendEventOnView } from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ShareButton from "./ShareButton.tsx";
import Similars from "./Similars.tsx";
import ReviewsScript from "./ReviewsScript.tsx";
import QuickReview from "./QuickReview.tsx";
import AugmentedReality from "./AugmentedReality.tsx";
import CTA from "./CTA.tsx";
import PhysicalStoresButton from "$store/islands/PhysicalStoresButton.tsx";

interface Props {
  page: ProductDetailsPage | null;
  relatedProducts: Product[] | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, relatedProducts, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
    url,
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const referenceId = additionalProperty.find((item) => item.name === "RefId")
    ?.value;
  const similarsColorsLength = (relatedProducts && relatedProducts.length) ?? 0;
  const discountValue = Math.ceil(listPrice! - price!);
  const discountPercentage = Math.round((discountValue * 100) / listPrice!);
  const hasPromptDeliveryFlag = additionalProperty.find((item) =>
    item.value === "Pronta Entrega"
  );
  const hasExclusiveFlag = additionalProperty.find((item) =>
    item.value === "Exclusivo"
  );

  return (
    <div
      class="flex flex-col lg:border lg:border-[#DFDFDF] lg:px-[25px] md:mt-10 md:pb-6 lg:max-w-[440px] px-4 md:px-0"
      id={id}
    >
      <ReviewsScript />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div class="flex items-center justify-between gap-3 w-full">
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2">
              <QuickReview
                productID={isVariantOf?.productGroupID ||
                  product.inProductGroupWithID}
              />
            </div>

            <h1>
              <span class="font-medium text-[22px] leading-7 capitalize">
                {layout?.name === "concat"
                  ? `${isVariantOf?.name} ${name}`
                  : layout?.name === "productGroup"
                  ? isVariantOf?.name
                  : name}
              </span>
            </h1>
          </div>

          <div class="flex items-center gap-1">
            <WishlistButton
              icon="HeartOutline"
              variant="icon"
              productID={productID}
              productGroupID={productGroupID}
            />

            {url && <ShareButton url={url} />}
          </div>
        </div>

        {referenceId && (
          <span
            id="referenceId"
            class="text-xs text-[#828282] uppercase leading-3"
          >
            ID: {referenceId}
          </span>
        )}

        {/* Flags */}
        <div class="flex items-center gap-2 mt-1">
          {hasPromptDeliveryFlag && (
            <div class="flex items-center justify-center bg-[#555] rounded-md text-xs leading-[12px] text-white py-3 px-1.5 max-w-[120px] w-full h-[18px]">
              pronta entrega
            </div>
          )}

          {hasExclusiveFlag && (
            <div class="flex items-center justify-center bg-[#F0F0F0] rounded-md text-xs leading-[12px] text-dimgray py-3 px-1 max-w-[70px] w-full h-[18px]">
              exclusivo
            </div>
          )}

          {similarsColorsLength > 0 && (
            <div class="flex items-center justify-center bg-[#F0F0F0] rounded-md text-xs leading-[12px] text-dimgray py-3 px-1 max-w-[70px] w-full h-[18px]">
              +{similarsColorsLength} cores
            </div>
          )}

          {((listPrice ?? 0) - (price ?? 0) > 0) && (
            <div class="flex items-center justify-center bg-[#E31010] rounded-md text-xs font-bold leading-[18px] text-white py-3 px-1 max-w-[46px] w-full h-[18px]">
              -{discountPercentage}%
            </div>
          )}
        </div>
      </div>
      {/* Prices */}
      <div class="flex items-start flex-col mt-4">
        <div class="flex flex-col items-start">
          {(listPrice ?? 0) > price && (
            <div class="flex items-center gap-2">
              <span class="line-through text-xs leading-6 text-[#858585]">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>

              <span class="text-[#E31010] text-[13px] leading-[18px]">
                (R$ {discountValue} off)
              </span>
            </div>
          )}
          <span class="font-bold text-[24px] leading-[25px]">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        <span class="text-base">
          {installments?.replace(".", ",")}
        </span>
      </div>
      {/* Sku Selector */}
      {isVariantOf && isVariantOf?.hasVariant?.length > 0 && (
        <div class="mt-3">
          <ProductSelector product={product} />
        </div>
      )}
      {/* Add to Cart and Favorites button */}
      <div class="mt-2 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                </>
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8 border-b border-[#DFDFDF] pb-6">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>

      {/* Special Buttons */}
      <div class="flex flex-col gap-2.5 mt-6 border-b border-[#DFDFDF] pb-6">
        <button
          aria-label="call seller"
          class="px-3 py-1 leading-3 text-[13px] w-[280px] h-10 flex items-center bg-[#E7E7E7CC] text-black gap-1.5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.62492 13.1667H9.20825V10.7917H11.5833V9.20834H9.20825V6.83334H7.62492V9.20834H5.24992V10.7917H7.62492V13.1667ZM3.66659 16.3333C3.23117 16.3333 2.85843 16.1783 2.54836 15.8682C2.23829 15.5582 2.08325 15.1854 2.08325 14.75V5.25001C2.08325 4.81459 2.23829 4.44185 2.54836 4.13178C2.85843 3.82171 3.23117 3.66667 3.66659 3.66667H13.1666C13.602 3.66667 13.9747 3.82171 14.2848 4.13178C14.5949 4.44185 14.7499 4.81459 14.7499 5.25001V8.81251L17.9166 5.64584V14.3542L14.7499 11.1875V14.75C14.7499 15.1854 14.5949 15.5582 14.2848 15.8682C13.9747 16.1783 13.602 16.3333 13.1666 16.3333H3.66659ZM3.66659 14.75H13.1666V5.25001H3.66659V14.75Z"
              fill="#212121"
            />
          </svg>

          <span>Fazer chamada com um vendedor</span>
        </button>

        {isVariantOf && isVariantOf.model && (
          <PhysicalStoresButton refId={isVariantOf.model} />
        )}
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div class="mt-6">
          <Similars relatedProducts={relatedProducts} />
        </div>
      )}

      <AugmentedReality />

      <CTA
        eventParams={{ items: [eventItem] }}
        productID={productID}
        seller={seller}
        name={isVariantOf?.name ?? name}
        price={price}
        listPrice={listPrice}
        content={{
          image: product?.image?.[0]?.url ?? "",
          alt: product?.image?.[0]?.alternateName ?? "",
        }}
        priceCurrency={offers?.priceCurrency}
        installments={installments ?? ""}
      />
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;

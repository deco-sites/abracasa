import { SendEventOnView } from "$store/components/Analytics.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Similars from "./Similars.tsx";
import ReviewsScript from "./ReviewsScript.tsx";
import QuickReview from "./QuickReview.tsx";
import AugmentedReality from "./AugmentedReality.tsx";
import CTA from "./CTA.tsx";
import PhysicalStoresButton from "$store/islands/PhysicalStoresButton.tsx";
import ArButton from "site/components/product/ArButton.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
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
    sku: skuId,
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
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
  const similarsColorsLength =
    (page.product.isSimilarTo && page.product.isSimilarTo.length) ?? 0;
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
      class="flex flex-col lg:border lg:border-[#DFDFDF] lg:px-[25px] md:mt-[72px] md:pb-6 min-w-[100vw] sm:min-w-full lg:w-[440px] px-4 md:px-0"
      id={id}
    >
      <ArButton />
      <ReviewsScript />
      {/* Code and name */}
      <div class="sm:mt-8">
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

          {
            /* <div class="flex items-center gap-1">
            <WishlistButton
              icon="HeartOutline"
              variant="icon"
              productID={productID}
              productGroupID={productGroupID}
            />

            {url && <ShareButton url={url} />}
          </div> */
          }
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
            <div class="flex items-center justify-center bg-dimgray rounded-md text-xs leading-[12px] text-white py-3 px-1.5 max-w-[120px] w-full h-[18px]">
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
      <div class="flex items-start flex-col mt-6">
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
      <div class="mt-[15px] flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <a
                    href={`/checkout/cart/add?sku=${skuId}&qty=1&seller=${seller}&redirect=true&sc=1`}
                    class="flex items-center justify-center h-[66px] w-full bg-dimgray hover:bg-black/70 font-bold text-white uppercase text-[18px] leading-[25px]"
                  >
                    Comprar
                  </a>
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
        {/* <SellerButton /> */}

        {isVariantOf && isVariantOf.model && (
          <PhysicalStoresButton refId={referenceId ?? isVariantOf.model} />
        )}
      </div>

      {page.product.isSimilarTo && page.product.isSimilarTo.length > 0 && (
        <div class="mt-6">
          <Similars relatedProducts={page.product.isSimilarTo} />
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

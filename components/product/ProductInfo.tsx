import { SendEventOnView } from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";

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

  const discountValue = listPrice! - price!;
  const discountPercentage = Math.round((discountValue * 100) / listPrice!);
  const hasPromptDeliveryFlag = additionalProperty.find((item) =>
    item.value === "Pronta Entrega"
  );
  const hasExclusiveFlag = additionalProperty.find((item) =>
    item.value === "Exclusivo"
  );

  return (
    <div
      class="flex flex-col lg:border lg:border-[#DFDFDF] lg:px-[25px] md:mt-10 md:pb-6 lg:max-w-[440px]"
      id={id}
    >
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div class="flex items-center justify-between gap-3 w-full">
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2">
              <div class="rating rating-sm">
                <input
                  type="radio"
                  name="rating-6"
                  class="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-6"
                  class="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-6"
                  class="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-6"
                  class="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-6"
                  class="mask mask-star-2 bg-orange-400"
                />
              </div>

              <span class="uppercase text-xs text-[#B2B2B2] leading-3 pt-0.5">
                (103 avaliações)
              </span>
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

            <button aria-label="share item">
              <Icon id="Share" size={24} strokeWidth={1} />
            </button>
          </div>
        </div>

        {referenceId && (
          <span class="text-xs text-[#828282] uppercase leading-3">
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
              {platform === "wake" && (
                <AddToCartButtonWake
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
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

        <button
          aria-label="physical stores"
          class="px-3 py-1 leading-3 text-[13px] w-[280px] h-10 flex items-center bg-[#E7E7E7CC] text-black gap-1.5"
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_8228_3909)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.505 1.594C1.588 1.27868 1.77557 1.00086 2.037 0.806C2.301 0.608 2.626 0.5 2.96 0.5H13.04C13.375 0.5 13.7 0.608 13.963 0.806C14.227 1.004 14.413 1.282 14.495 1.594L15.5 5.467V5.556C15.5 6.187 15.2 6.736 14.75 7.12V12.056C14.75 12.439 14.592 12.806 14.31 13.076C14.0246 13.3488 13.6448 13.5007 13.25 13.5H2.75C2.35533 13.501 1.97555 13.3494 1.69 13.077C1.55166 12.9452 1.44138 12.7869 1.36576 12.6114C1.29015 12.436 1.25078 12.247 1.25 12.056V7.12C0.8 6.736 0.5 6.188 0.5 5.556V5.466L1.505 1.594ZM2.75 7.715V12.055H13.25V7.715C12.5717 7.7651 11.9003 7.55201 11.375 7.12C10.8997 7.51135 10.3026 7.72429 9.687 7.722C9.0717 7.72406 8.475 7.51113 8 7.12C7.52474 7.51135 6.92765 7.72429 6.312 7.722C5.69669 7.72406 5.1 7.51113 4.625 7.12C4.09989 7.55237 3.42839 7.76482 2.75 7.715ZM5.377 5.59C5.399 5.904 5.731 6.277 6.313 6.277C6.916 6.277 7.25 5.877 7.25 5.555V1.945H5.85L5.377 5.59ZM4.337 1.944L3.875 5.511V5.556C3.875 5.876 3.541 6.278 2.937 6.278C2.725 6.278 2.535 6.223 2.383 6.136C2.153 6.004 2.029 5.814 2.004 5.626L2.961 1.944H4.338H4.337ZM8.75 1.944V5.556C8.75 5.876 9.085 6.278 9.688 6.278C10.276 6.278 10.608 5.896 10.625 5.578L10.31 1.945H8.75V1.944ZM11.815 1.944L12.125 5.525V5.555C12.125 5.877 12.46 6.278 13.063 6.278C13.275 6.278 13.465 6.223 13.617 6.136C13.847 6.004 13.971 5.814 13.995 5.626L13.039 1.944H11.815Z"
                fill="#212121"
              />
            </g>
            <defs>
              <clipPath id="clip0_8228_3909">
                <rect
                  width="15"
                  height="13"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <span>Lojas físicas com este produto</span>
        </button>
      </div>
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

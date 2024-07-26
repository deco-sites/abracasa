import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";
import SuggestionCard from "$store/components/product/SuggestionCard.tsx";
import { formatPrice } from "deco-sites/abracasa/sdk/format.ts";
import { useOffer } from "deco-sites/abracasa/sdk/useOffer.ts";
import AddToCartButton from "$store/islands/ShowTogether/AddToCartButton.tsx";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
  suggestions: Product[] | null;
}

const ProductCard = ({ product }: { product: Product }) => (
  <SuggestionCard
    product={{
      "@type": product["@type"],
      name: product.name ?? "",
      productID: product.productID,
      additionalProperty: product.additionalProperty,
      image: product.image,
      offers: product.offers,
      url: product.url,
      sku: product.sku,
    }}
  />
);

export default function ProductMatcher({ page, suggestions }: Props) {
  if (!page || !page.product || !suggestions || suggestions.length === 0) {
    return null;
  }

  const product = page.product;
  const { price: definitivePrice, seller } = useOffer(product.offers);

  const secondProduct = suggestions[0];
  const { price: secondPrice, seller: secondSeller } = useOffer(
    secondProduct.offers,
  );

  const isChecked = true;

  const totalPrice = (definitivePrice ?? 0) +
    (isChecked ? (secondPrice ?? 0) : 0);
  const installmentPrice = totalPrice / 8;

  return (
    <div class="flex flex-col xl:flex-row container max-w-[1200px] items-center w-full px-2 xl:px-0 xl:gap-8 my-8">
      <div class="flex flex-col xl:flex-row items-center justify-start border border-gray-dark xl:border-none rounded-xl px-1 xl:px-0 xl:gap-8">
        <ProductCard product={product} />

        <div class="btn btn-circle btn-outline text-gray-950 hover:text-gray-950 hover:bg-transparent">
          <Icon id="Plus" width={12} height={12} strokeWidth={3} />
        </div>

        <ProductCard product={secondProduct} />

        <div class="btn btn-circle btn-outline text-gray-950 hover:text-gray-950 hover:bg-transparent mb-2 xl:mb-0">
          =
        </div>
      </div>

      <div class="flex flex-col items-center xl:items-start gap-1 mt-4 xl:mt-0">
        <p>
          {isChecked ? "Compre os 2 produtos por:" : "Compre um 1 produto por:"}
        </p>
        <span class="font-bold leading-[22px]">
          {formatPrice(totalPrice, secondProduct.offers!.priceCurrency!)}
        </span>
        <span class="flex">
          <div class="text-sm leading-[22px]">
            ou{"  "}<span class="font-bold text-lg">8x</span>{"  "}de{"  "}
            <span class="font-bold text-lg">
              {formatPrice(
                installmentPrice,
                secondProduct.offers!.priceCurrency!,
              )}
            </span>{"  "}
            s/juros
          </div>
        </span>

        <AddToCartButton
          products={[
            {
              seller,
              discount: 0,
              productGroupId: product.isVariantOf?.productGroupID ?? "",
              name: product.name ?? "",
              price: definitivePrice!,
              quantity: 1,
              sku: product.sku,
            },
            {
              seller: secondSeller,
              quantity: 1,
              discount: 0,
              productGroupId: secondProduct.isVariantOf?.productGroupID ?? "",
              name: secondProduct.name ?? "",
              price: secondPrice!,
              sku: secondProduct.sku,
            },
          ]}
        />
      </div>
    </div>
  );
}

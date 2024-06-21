import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";

export interface Props {
  similarsColors?: boolean;
}

export default function productSimilarsColors(
  { similarsColors }: Props,
  _req: Request,
  ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
  return async (p: ProductDetailsPage | null) => {
    if (!p) return null;

    const similarActiveValue = p.product.isVariantOf?.additionalProperty?.find((
      item,
    ) => item.name == "ProdutosSimilares")?.value;

    if (similarsColors && similarActiveValue) {
      try {
        const similarsProducts = await ctx.invoke.vtex.loaders.legacy
          .productListingPage({
            fq: `specificationFilter_178:${
              encodeURIComponent(similarActiveValue)
            }`,
            count: 20,
          });

        return {
          ...p,
          product: {
            ...p.product,
            isSimilarTo: similarsProducts?.products.filter((item) =>
              item.name !== p.product.name
            ),
          },
        };
      } catch (error) {
        console.error("Erro ao modificar o produto:", error);
        return p;
      }
    }

    return p;
  };
}

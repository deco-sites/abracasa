import { ProductDetailsPage } from "apps/commerce/types.ts";

import Image from "apps/website/components/Image.tsx";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page) return null;

  const measurementImage = page?.product?.image?.find((item) =>
    item.name === "medidas"
  );

  const description = page?.product?.description ||
    page?.product?.isVariantOf?.description;

  return (
    <div class="hidden lg:flex flex-col max-w-[1200px] mx-auto w-full gap-3">
      <div class="grid grid-cols-4 w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-6">
        <a
          href="#about-product"
          class="text-center border-b border-b-firebrick pb-2"
        >
          Sobre o produto
        </a>

        <a href="#" class="text-center border-b border-b-firebrick pb-2">
          Dimensões e detalhes
        </a>

        <a href="#" class="text-center border-b border-b-firebrick pb-2">
          Avaliações
        </a>

        <a href="#" class="text-center border-b border-b-firebrick pb-2">
          Perguntas e respostas
        </a>
      </div>

      <div
        id="about-product"
        dangerouslySetInnerHTML={{
          __html: description?.replace(/\r?\n/g, "<br />") || "",
        }}
      />

      {measurementImage && measurementImage.url && (
        <Image
          src={measurementImage.url}
          alt={measurementImage.alternateName || "Medidas"}
          width={420}
          height={420}
        />
      )}
    </div>
  );
}

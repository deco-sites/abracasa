import { ProductDetailsPage } from "apps/commerce/types.ts";

import Image from "apps/website/components/Image.tsx";
import ReviewsSummary from "./ReviewsSummary.tsx";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page) return null;

  const {
    product,
  } = page;

  const {
    isVariantOf,
    image: images = [],
  } = product;

  const additionalInfos =
    isVariantOf?.additionalProperty?.filter((item) =>
      item?.name !== "ProdutosSimilares"
    ) ?? [];

  const measurementImage = images?.find((item) => item.name === "medidas");

  const description = product?.description || product?.isVariantOf?.description;

  return (
    <div class="hidden lg:flex flex-col max-w-[1200px] mx-auto w-full gap-4">
      <div class="grid grid-cols-4 w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-6">
        <a
          href="#about-product"
          class="text-center border-b border-b-firebrick pb-2"
        >
          Sobre o produto
        </a>

        <a
          href="#dimensions-and-details"
          class="text-center border-b border-b-firebrick pb-2"
        >
          Dimensões e detalhes
        </a>

        <a
          href="#avaliations"
          class="text-center border-b border-b-firebrick pb-2"
        >
          Avaliações
        </a>

        <a
          href="#avaliations"
          class="text-center border-b border-b-firebrick pb-2"
        >
          Perguntas e respostas
        </a>
      </div>

      <div class="flex flex-col gap-12 max-w-[87%] xl:max-w-full mx-auto">
        <div
          id="about-product"
          dangerouslySetInnerHTML={{
            __html: description?.replace(/\r?\n/g, "<br />") || "",
          }}
        />

        <div class="flex flex-col gap-12">
          <h1 id="dimensions-and-details" class="font-bold text-xl">
            Dimensões e Detalhes
          </h1>

          <div class="flex items-center justify-center">
            {measurementImage && measurementImage.url && (
              <Image
                src={measurementImage.url}
                alt={measurementImage.alternateName || "Medidas"}
                width={420}
                height={420}
              />
            )}
          </div>

          <ul class="flex flex-col max-w-[75%] mx-auto w-full gap-1">
            {additionalInfos?.map((item) => (
              <li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                <span class="font-bold w-full">{item.name}</span>

                {item?.name?.includes("Materiais")
                  ? (
                    <div
                      class="w-[65%] text-justify leading-relaxed tracking-wide"
                      dangerouslySetInnerHTML={{
                        __html: item?.value?.replace(/\r?\n/g, "<br />") || "",
                      }}
                    />
                  )
                  : item?.name?.includes("Limpeza e cuidados")
                  ? (
                    <a
                      target="_blank"
                      aria-label="abrir manual"
                      href={item.value}
                      class="w-[65%] text-crimson text-end"
                    >
                      Abrir manual
                    </a>
                  )
                  : (
                    <span
                      class={`${
                        item?.name !== "Garantia" && "text-end"
                      } w-[65%]`}
                    >
                      {item.value}
                    </span>
                  )}
              </li>
            ))}
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h1 id="avaliations" class="font-bold text-2xl">Avaliações</h1>

          <ReviewsSummary />
        </div>
      </div>
    </div>
  );
}

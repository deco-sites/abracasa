import { ProductDetailsPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import ReviewsSummary from "./ReviewsSummary.tsx";
import { AppContext } from "$store/apps/site.ts";
import { Device } from "deco/utils/device.ts";

export interface Props {
  page: ProductDetailsPage | null;
  /**
   * @ignore
   */
  device?: Device;
}

export default function ProductDetails(
  { page, device }: Props,
) {
  if (!page) return null;

  const {
    product,
  } = page;

  const {
    isVariantOf,
    image: images = [],
  } = product;

  const isDesktop = device === "desktop";

  const additionalInfos =
    isVariantOf?.additionalProperty?.filter((item) =>
      item?.name !== "ProdutosSimilares"
    ) ?? [];

  const measurementImage = images?.find((item) => item.name === "medidas");

  const description = product?.description || product?.isVariantOf?.description;

  return (
    <>
      {!isDesktop && (
        <>
          <div class="lg:hidden border-y w-full flex items-center justify-center py-6 mt-7 px-4">
            <span class="text-black w-full">
              <details class="w-full">
                <summary class="text-sm flex items-start justify-between cursor-pointer w-full collapse collapse-arrow">
                  <span class="flex flex-1 uppercase">
                    Sobre o produto
                  </span>
                  <Icon id="ChevronDown" size={24} strokeWidth={2} />
                </summary>

                {description && (
                  <div
                    class="text-base font-normal my-8"
                    dangerouslySetInnerHTML={{
                      __html: description.replace(/\r?\n/g, "<br />"),
                    }}
                  />
                )}
              </details>
            </span>
          </div>

          <div class="lg:hidden border-b w-full flex items-center justify-center py-6 px-4">
            <span class="text-black w-full">
              <details class="w-full">
                <summary class="text-sm flex items-start justify-between cursor-pointer w-full collapse collapse-arrow">
                  <span class="flex flex-1 uppercase">
                    Dimensões e detalhes
                  </span>
                  <Icon id="ChevronDown" size={24} strokeWidth={2} />
                </summary>

                <div class="flex flex-col gap-6">
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

                  <ul class="flex flex-col w-full gap-1">
                    {additionalInfos?.map((item) => (
                      <li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span class="font-bold w-[70%]">{item.name}</span>

                        {item?.name?.includes("Materiais")
                          ? (
                            <div
                              class="w-full text-end leading-relaxed tracking-wide"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.value?.replace(/\r?\n/g, "<br />") ||
                                  "",
                              }}
                            />
                          )
                          : item?.name?.includes("Limpeza e cuidados")
                          ? (
                            <div
                              class="text-end w-full"
                              dangerouslySetInnerHTML={{
                                __html: item.value || "",
                              }}
                            />
                          )
                          : (
                            <span
                              class={`${
                                item?.name === "Entrega"
                                  ? "text-justify"
                                  : "text-end"
                              } w-full`}
                            >
                              {item.value}
                            </span>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </span>
          </div>

          <div class="lg:hidden border-b w-full flex items-center justify-center py-6 px-4">
            <span class="text-black w-full">
              <details class="w-full">
                <summary class="text-sm flex items-start justify-between cursor-pointer w-full collapse collapse-arrow">
                  <span class="flex flex-1 uppercase">
                    Avaliações
                  </span>
                  <Icon id="ChevronDown" size={24} strokeWidth={2} />
                </summary>

                <ReviewsSummary />
              </details>
            </span>
          </div>
        </>
      )}

      {isDesktop && (
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
                            __html: item?.value?.replace(/\r?\n/g, "<br />") ||
                              "",
                          }}
                        />
                      )
                      : item?.name?.includes("Limpeza e cuidados")
                      ? (
                        <div
                          class={`${
                            item?.value?.includes("Abrir manual") &&
                            "text-crimson"
                          } text-end w-full`}
                          dangerouslySetInnerHTML={{
                            __html: item.value?.replace("?", "") || "",
                          }}
                        />
                      )
                      : (
                        <span
                          class={`${
                            item?.name === "Entrega"
                              ? "text-justify"
                              : "text-end"
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
      )}
    </>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const skuId = props.page?.product.sku || props.page?.product.productID;

  if (skuId) {
    const data = await ctx.vtex?.vcs
      ["GET /api/catalog/pvt/stockkeepingunit/:skuId"]({
        skuId,
      }).then((response) => response.json());

    if (data) {
      const packagedWeightKg = {
        "@type": "PropertyValue",
        "name": "Peso",
        "value": (data!.PackagedWeightKg! / 1000) + " Kg",
        "valueReference": "SPECIFICATION",
      };

      const length = {
        "@type": "PropertyValue",
        "name": "Comprimento",
        "value": (data!.Length! / 100)?.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " Metros",
        "valueReference": "SPECIFICATION",
      };

      const width = {
        "@type": "PropertyValue",
        "name": "Largura",
        "value": (data!.Width! / 100)?.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " Centímetros",
        "valueReference": "SPECIFICATION",
      };

      const height = {
        "@type": "PropertyValue",
        "name": "Altura",
        "value": (data!.Height! / 100)?.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " Centímetros",
        "valueReference": "SPECIFICATION",
      };

      const additionalProperty = [
        props.page?.product?.isVariantOf?.additionalProperty,
        packagedWeightKg,
        length,
        width,
        height,
      ];

      return {
        ...props,
        page: {
          ...props.page,
          product: {
            ...props.page?.product,
            isVariantOf: {
              ...props.page?.product?.isVariantOf,
              additionalProperty,
            },
          },
        },
        device: ctx.device,
      };
    }
  }

  return {
    ...props,
    device: ctx.device,
  };
};

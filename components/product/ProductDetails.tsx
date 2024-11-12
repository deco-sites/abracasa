import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import ReviewsSummary from "./ReviewsSummary.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { type FnContext } from "@deco/deco";
export interface APIResponse {
    WeightKg: number;
    Length: number;
    Width: number;
    Height: number;
}
export interface Props {
    page: ProductDetailsPage | null;
    atelieImage?: {
        mobile?: {
            image?: ImageWidget;
            width?: number;
            height?: number;
        };
        desktop?: {
            image?: ImageWidget;
            width?: number;
            height?: number;
        };
        description?: string;
        link?: string;
    };
    appKey?: Secret;
    appToken?: Secret;
    /**
     * @ignore
     */
    weight?: number;
    /**
     * @ignore
     */
    length?: number;
    /**
     * @ignore
     */
    width?: number;
    /**
     * @ignore
     */
    height?: number;
    /**
     * @ignore
     */
    device?: Device;
}
export default function ProductDetails({ page, weight, length, width, height, atelieImage, device }: Props) {
    if (!page)
        return null;
    const { product, } = page;
    const { isVariantOf, image: images = [], additionalProperty = [], } = product;
    const isDesktop = device === "desktop";
    const additionalInfos: PropertyValue[] = (isVariantOf?.additionalProperty ?? [])
        .filter((item) => item.name !== "ProdutosSimilares" && item.name !== "sellerId")
        .reduce((acc: PropertyValue[], item) => {
        const existing = acc.find((i) => i.name === item.name);
        if (existing) {
            existing.value += `, ${item.value}`;
        }
        else {
            acc.push({ ...item });
        }
        return acc;
    }, []);
    const measurementImage = images?.find((item) => item.name === "medidas");
    const description = product?.description || product?.isVariantOf?.description;
    const hasAtelieFlag = additionalProperty?.some((property) => property.value?.includes("Atelie Casa"));
    return (<>
      {!isDesktop && (<>
          <div class="lg:hidden border-y w-full flex items-center justify-center py-6 mt-7 px-4">
            <span class="text-black w-full">
              <details class="w-full">
                <summary class="text-sm flex items-start justify-between cursor-pointer w-full collapse collapse-arrow">
                  <span class="flex flex-1 uppercase">
                    Sobre o produto
                  </span>
                  <Icon id="ChevronDown" size={24} strokeWidth={2}/>
                </summary>

                {description && (<div class="flex flex-col gap-4 my-8 w-full">
                    {hasAtelieFlag && atelieImage && (<a href={atelieImage.link} class="w-full">
                        <Image src={atelieImage?.mobile?.image || ""} alt={atelieImage?.description || "Banner Ateliê"} width={atelieImage?.mobile?.width || 550} height={atelieImage?.mobile?.height || 280} loading="lazy" class="w-full"/>
                      </a>)}
                    <div class="text-base font-normal" dangerouslySetInnerHTML={{
                    __html: description.replace(/\r?\n/g, "<br />"),
                }}/>
                  </div>)}
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
                  <Icon id="ChevronDown" size={24} strokeWidth={2}/>
                </summary>

                <div class="flex flex-col gap-6">
                  <div class="flex items-center justify-center">
                    {measurementImage && measurementImage.url && (<Image src={measurementImage.url} alt={measurementImage.alternateName || "Medidas"} width={420} height={420}/>)}
                  </div>

                  <ul class="flex flex-col w-full gap-1">
                    {additionalInfos?.map((item, index) => (<li key={index} className="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span className="font-bold w-full">{item.name}</span>

                        {item?.name?.includes("Materiais") && (<div className="w-full text-end leading-relaxed tracking-wide" dangerouslySetInnerHTML={{
                        __html: item?.value?.replace(/\r?\n/g, "<br />") || "",
                    }}/>)}

                        {item?.value?.includes("Abrir manual") && (<div className="text-crimson text-end w-full" dangerouslySetInnerHTML={{
                        __html: item.value.replace("?", ""),
                    }}/>)}

                        {!item?.name?.includes("Materiais") &&
                    !item?.name?.includes("Limpeza e cuidados") &&
                    !item?.value?.includes("Abrir manual") && (<span className={`${item.name === "Entrega"
                        ? "text-justify"
                        : "text-end"} w-full`}>
                            {item.value}
                          </span>)}
                      </li>))}

                    {weight && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span class="font-bold">Peso</span>

                        <span>{weight / 1000}kg</span>
                      </li>)}

                    {length && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span class="font-bold">Comprimento</span>

                        <span>
                          {length?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                        </span>
                      </li>)}

                    {width && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span class="font-bold">Largura</span>

                        <span>
                          {width?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                        </span>
                      </li>)}

                    {height && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                        <span class="font-bold">Altura</span>

                        <span>
                          {height?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                        </span>
                      </li>)}
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
                  <Icon id="ChevronDown" size={24} strokeWidth={2}/>
                </summary>

                <ReviewsSummary />
              </details>
            </span>
          </div>
        </>)}

      {isDesktop && (<div class="hidden lg:flex flex-col max-w-[1200px] mx-auto w-full gap-4">
          <div class="grid grid-cols-4 w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-6">
            <a href="#about-product" class="text-center border-b border-b-firebrick pb-2">
              Sobre o produto
            </a>

            <a href="#dimensions-and-details" class="text-center border-b border-b-firebrick pb-2">
              Dimensões e detalhes
            </a>

            <a href="#avaliations" class="text-center border-b border-b-firebrick pb-2">
              Avaliações
            </a>

            <a href="#avaliations" class="text-center border-b border-b-firebrick pb-2">
              Perguntas e respostas
            </a>
          </div>

          <div class="flex flex-col gap-10 max-w-[87%] xl:max-w-full mx-auto">
            {hasAtelieFlag && atelieImage && (<a href={atelieImage.link} class="w-full">
                <Image src={atelieImage?.desktop?.image || ""} alt={atelieImage?.description || "Banner Ateliê"} width={atelieImage?.desktop?.width || 1920} height={atelieImage?.desktop?.height || 386} loading="lazy" class="w-full"/>
              </a>)}

            <div id="about-product" dangerouslySetInnerHTML={{
                __html: description?.replace(/\r?\n/g, "<br />") || "",
            }}/>

            <div class="flex flex-col gap-12">
              <h1 id="dimensions-and-details" class="font-bold text-xl">
                Dimensões e Detalhes
              </h1>

              <div class="flex items-center justify-center">
                {measurementImage && measurementImage.url && (<Image src={measurementImage.url} alt={measurementImage.alternateName || "Medidas"} width={420} height={420}/>)}
              </div>

              <ul class="flex flex-col max-w-[75%] mx-auto w-full gap-1">
                {additionalInfos?.map((item, index) => (<li key={index} className="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                    <span className="font-bold w-full">{item.name}</span>

                    {item?.value?.includes("Abrir manual")
                    ? (<div className="text-crimson text-end w-full" dangerouslySetInnerHTML={{
                            __html: item.value.replace("?", ""),
                        }}/>)
                    : item?.name?.includes("Materiais")
                        ? (<div className="w-[65%] text-justify leading-relaxed tracking-wide" dangerouslySetInnerHTML={{
                                __html: item?.value?.replace(/\r?\n/g, "<br />") ||
                                    "",
                            }}/>)
                        : (<span className={`${item.name === "Entrega"
                                ? "text-justify"
                                : "text-end"} w-[65%]`}>
                          {item.value}
                        </span>)}
                  </li>))}

                {weight && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                    <span class="font-bold w-[70%]">Peso</span>

                    <span>{weight / 1000}kg</span>
                  </li>)}

                {length && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                    <span class="font-bold w-[70%]">Comprimento</span>

                    <span>
                      {length?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                    </span>
                  </li>)}

                {width && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                    <span class="font-bold w-[70%]">Largura</span>

                    <span>
                      {width?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                    </span>
                  </li>)}

                {height && (<li class="flex items-center justify-between border-b border-b-[#f2f2f2] last:border-none pb-1 gap-8">
                    <span class="font-bold w-[70%]">Altura</span>

                    <span>
                      {height?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}cm
                    </span>
                  </li>)}
              </ul>
            </div>

            <div class="flex flex-col gap-4">
              <h1 id="avaliations" class="font-bold text-2xl">Avaliações</h1>

              <ReviewsSummary />
            </div>
          </div>
        </div>)}
    </>);
}
export const loader = async (props: Props, _req: Request, ctx: FnContext) => {
    const skuId = props.page?.product.sku || props.page?.product.productID;
    const isKit = props.page?.product?.additionalProperty?.some((item) => item.value === "Kit Quarto" || item.value === "Conjunto Mesa e Cadeira");
    const VTEXAPIAPPKEY = await props?.appKey?.get?.();
    const VTEXAPIAPPTOKEN = await props?.appToken?.get?.();
    if (skuId && VTEXAPIAPPKEY != null && VTEXAPIAPPTOKEN != null && !isKit) {
        const data = await fetchSafe(`https://abracasa.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${skuId}`, {
            headers: {
                "X-VTEX-API-AppKey": VTEXAPIAPPKEY,
                "X-VTEX-API-AppToken": VTEXAPIAPPTOKEN,
            },
        }).then((data) => data.json()) as APIResponse;
        if (data) {
            return {
                ...props,
                weight: data?.WeightKg,
                length: data?.Length,
                width: data?.Width,
                height: data?.Height,
                device: ctx.device,
            };
        }
    }
    return {
        ...props,
        device: ctx.device,
    };
};

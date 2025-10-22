import type { HTMLWidget } from "apps/admin/widgets.ts";
import Button from "deco-sites/abracasa/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import { asset } from "$fresh/runtime.ts";
import { BrazilianStates } from "deco-sites/abracasa/constants/brazilianStates.ts";

/**
 * @titleBy titleStore
 */
export interface Store {
  /**
   * @title Nome da loja
   */
  titleStore: string;
  /**
   * @title Mapa
   * @description Link para o mapa da loja (ex: https://goo.gl/maps/
   */
  map?: string;
  /**
   * @title WhatsApp
   * @description Número do WhatsApp (ex: 11999999999)
   */
  whatsapp: string;
  /**
   * @title Telefone
   * @description Número do WhatsApp (ex: 11999999999)
   */
  telephone?: string;
  /**
   * @title Descrição da loja
   */
  description: HTMLWidget;
}

/**
 * @titleBy title
 */
export interface City {
  /**
   * @title Nome da cidade
   */
  title: string;
  /**
   * @title UF
   */
  state: BrazilianStates;
  stores: Store[];
  /**
   * @title Imagem para Desktop
   * @description Imagem para dispositivos desktop.
   */
  imageDesktop?: ImageWidget;
  /**
   * @title Texto alternativo da imagem
   * @description Texto alternativo para a imagem, importante para acessibilidade.
   */
  imageAlt?: string;
  /**
   * @title Imagem para Mobile
   * @description Imagem para dispositivos móveis.
   */
  imageMobile?: ImageWidget;
}

export interface Props {
  /**
   * @title Cidades e lojas
   * @description Lista de cidades e suas respectivas lojas.
   */
  cities: City[];
}

const DEFAULT_IMAGE_DESKTOP = asset("/image/nossas_lojas_banner.png");
const DEFAULT_IMAGE_MOBILE = asset("/image/nossas_lojas_banner_mobile.png");

const formatPhone = (raw: string) => {
  const ddd = raw.slice(0, 2);
  const part1 = raw.slice(2, 7);
  const part2 = raw.slice(7);
  return `(${ddd}) ${part1}-${part2}`;
};

export default function OurStores({ cities }: Props) {
  const [selectedState, setSelectedState] = useState<BrazilianStates>("RJ");

  const selectedCity = cities.find((city) => city.state === selectedState);

  return (
    <div
      class={
        "w-full flex items-center justify-center my-10 lg:my-16 min-h-max lg:h-[574px]"
      }
    >
      <div
        class={
          "max-w-[95%] lg:max-w-7xl h-full lg:px-8 w-full flex gap-10 lg:flex-row flex-col"
        }
      >
        <div
          class={
            " h-full overflow-hidden lg:min-w-[445px] flex flex-col gap-y-9 "
          }
        >
          <div class={"flex flex-wrap gap-y-1 lg:w-[420px]"}>
            {cities.map((city) => (
              <Button
                class={`w-1/2 rounded-none border border-[#585858] uppercase text-sm font-semibold hover:border-[#6e6e6e] hover:bg-[#6e6e6e] hover:text-white ${
                  selectedState === city.state
                    ? "bg-[#585858] text-white"
                    : "bg-white text-[#585858]"
                }`}
                onClick={() => setSelectedState(city.state)}
              >
                {city.title}
              </Button>
            ))}
          </div>
          <div
            class={
              "flex-1 overflow-y-scroll scroll-smooth pr-3 md:pr-4 overflow-x-hidden flex flex-col gap-3 md:gap-4 max-h-[420px] md:max-h-[470px] lg:max-h-full lg:h-full scrollbar-secondary scrollbar-gutter-stable"
            }
          >
            {selectedCity?.stores.map((store) => (
              <div class={"w-full cursor-pointe"}>
                <div class="flex flex-col justify-center border border-[#B1B1B1] py-4 px-[22px] md:py-[18px] md:px-[26px] lg:w-[420px] min-h-[120px] md:min-h-[146px]">
                  <div class={"flex md:items-center justify-between "}>
                    <strong
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      class="block font-semibold uppercase text-[#585858] pb-[7px] md:pb-[6px]"
                    >
                      {store.titleStore}
                    </strong>

                    {store.map && (
                      <a
                        href={store.map}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        class={
                          "uppercase text-[#585858] text-[7px]  md:text-[9px] leading-5 underline font-inter font-medium cursor-pointer"
                        }
                      >
                        ver no mapa
                      </a>
                    )}
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      class="text-[#585858] font-light text-xs md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: store.description,
                      }}
                    />
                    <a
                      href={`https://api.whatsapp.com/send?phone=55${store.whatsapp}`}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      class="flex gap-1 items-center flex-wrap max-w-full text-xs md:text-sm text-[#585858] font-light"
                    >
                      {store.telephone && (
                        <>
                          <p class=" whitespace-nowrap">
                            Telefone: {formatPhone(store.telephone)}
                          </p>
                          <span class="hidden sm:inline">/</span>
                        </>
                      )}
                      <p class=" whitespace-nowrap">
                        Whatsapp: {formatPhone(store.whatsapp)}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="w-full aspect-[3/1] min-h-[269px] max-h-[574px] overflow-hidden">
          <img
            class="w-full h-full object-cover md:block hidden"
            src={selectedCity?.imageDesktop ?? DEFAULT_IMAGE_DESKTOP}
            alt={selectedCity?.imageAlt ?? "Imagem da loja"}
            decoding="async"
            loading="lazy"
          />
          <img
            class="w-full h-full object-cover block md:hidden"
            src={selectedCity?.imageMobile ?? DEFAULT_IMAGE_MOBILE}
            alt={selectedCity?.imageAlt ?? "Imagem da loja"}
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  link?: string;
  /**
   * @title Imagens Desktop
   * @description 3 imagens do desktop
   * @maxItems 3
   */
  imagesDesktop?: ImageWidget[];
  /**
   * @title Imagens Mobile
   * @description 3 imagens do mobile
   * @maxItems 3
   */
  imagesMobile?: ImageWidget[];
}

export default function OurStores({
  imagesDesktop,
  imagesMobile,
  link,
}: Props) {
  return (
    <div class="w-full">
      <div class="bg-white flex flex-col items-center justify-center py-10">
        <div class="w-full max-w-[85%] mx-auto">
          <div class="hidden lg:flex flex-row justify-center gap-[75px] xl:gap-[123px]">
            <div class="flex flex-col gap-12 max-w-[278px] justify-center">
              <p class="font-inter text-[24px] leading-9 text-[#4F4F4F] font-normal max-w-[278px]">
                Encontre a nossa loja
                <br />
                mais próxima de você
              </p>

              <a
                href={link}
                class="font-inter flex items-center justify-center max-w-[244px] leading-[30px] h-12 px-8 py-3 bg-white border border-[#555555] text-[#555555] uppercase text-[16px] font-semibold hover:bg-[#585858] hover:text-white transition-colors"
              >
                VEJA TODAS
              </a>
            </div>

            {imagesDesktop && imagesDesktop.length >= 3 && (
              <div class="flex flex-row max-h-[546px] gap-3">
                <div class="h-64 lg:h-80 max-w-[449px]">
                  <img
                    src={imagesDesktop[0]}
                    alt="Loja 1"
                    class="w-full h-[546px] object-cover"
                  />
                </div>

                <div class="flex flex-col gap-[15px] max-w-[289px]">
                  <div class="h-full">
                    <img
                      src={imagesDesktop[1]}
                      alt="Loja 2"
                      class="w-full h-[193px] object-cover"
                    />
                  </div>
                  <div class="h-full">
                    <img
                      src={imagesDesktop[2]}
                      alt="Loja 3"
                      class="w-full h-[338px] object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div class="flex justify-center items-center lg:hidden">
            <div class="flex flex-col gap-12 items-start">
              <div>
                <p class="font-inter text-[24px] leading-9 text-[#4F4F4F] font-normal max-w-[280px] text-start mb-7">
                  Encontre a nossa loja
                  <br />
                  mais próxima de você
                </p>

                <a
                  href={link}
                  class="font-inter flex items-center justify-center h-12 min-w-[229px] px-6 py-2.5 bg-white border border-[#555555] text-[#555555] uppercase text-[12px] leading-[30px] font-semibold hover:bg-[#585858] hover:text-white transition-colors"
                >
                  VEJA TODAS
                </a>
              </div>

              {imagesMobile && imagesMobile.length >= 3 && (
                <div class="w-full max-w-md flex flex-row max-h-[247px] gap-[5px]">
                  <div class="h-full max-w-[202px]">
                    <img
                      src={imagesMobile[0]}
                      alt="Loja 1"
                      class="w-[202px] h-[247px] object-cover"
                    />
                  </div>
                  <div class="flex flex-col max-w-[131px] gap-2">
                    <img
                      src={imagesMobile[1]}
                      alt="Loja 2"
                      class="w-full object-cover min-h-[87px]"
                    />
                    <img
                      src={imagesMobile[2]}
                      alt="Loja 3"
                      class="w-full object-cover min-h-[152px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

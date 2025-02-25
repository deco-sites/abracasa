import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";

interface Props {
  title?: string;
  images?: {
    src?: LiveImage;
    width?: number;
    height?: number;
    srcMobile?: LiveImage;
    widthMobile?: number;
    heightMobile?: number;
    alt?: string;
    href?: string;
  }[];
  cta?: {
    text?: string;
    href?: string;
  };
}

function MeetStores({ title, images, cta }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-[#F6F6F6] pt-[27px] pb-16 lg:py-[50px]">
      <div class="container lg:max-w-[85%] flex flex-col">
        <span class="font-sans text-[#4F4F4F] px-[18px] lg:px-0 mb-6 lg:mb-[30px] text-2xl">
          {title}
        </span>
        {/* Mobile view */}
        <div class="lg:hidden">
          <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-6 md:gap-12 col-span-full row-start-2 row-end-5 lg:mt-8 max-w-full lg:max-w-[unset]">
            {images?.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item ml-5 w-[296px] group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
              >
                <a href={img.href} class="lg:hidden">
                  <Image
                    src={img.srcMobile ?? ""}
                    alt={img.alt}
                    width={img.widthMobile ?? 296}
                    height={img.heightMobile ?? 198}
                    loading="lazy"
                    decoding="async"
                    class="lg:hidden"
                  />
                </a>
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <SliderJS rootId={id} />
        {/* Desktop view */}
        <div class="hidden lg:block">
          <ul class="flex gap-4 items-center justify-center lg:justify-normal 2xl:justify-between 2xl:flex-wrap">
            {images?.map((img) => (
              <li key={img.src ?? img.href}>
                <a href={img.href}>
                  <Image
                    src={img.src ?? ""}
                    alt={img.alt}
                    width={img.width ?? 373}
                    height={img.height ?? 249}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          class="btn bg-white rounded-none flex items-center justify-center mt-9 lg:mt-[53px] w-full max-w-[94%] md:max-w-[440px] min-h-[48px] mx-auto text-[#555555] font-semibold text-xs py-2 border-[1px] border-solid border-[#808080] text-center tracking-[0.1em] hover:bg-dimgray hover:text-white"
          href={cta?.href}
        >
          {cta?.text ?? "ENCONTRE A LOJA MAIS PRÓXIMA DE VOCÊ"}
        </a>
      </div>
    </div>
  );
}

export default MeetStores;

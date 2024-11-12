import { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "site/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  departments: Array<{
    link: string;
    label: string;
    image: ImageWidget;
    description: string;
    loading: "lazy" | "eager";
    width?: number;
    height?: number;
  }>;
}

export default function Departments({ departments = [] }: Props) {
  const id = useId();

  return (
    <div class="w-full py-6 mt-6 relative lg:mx-auto">
      <div
        id={id}
        class="grid px-4"
      >
        <Slider class="flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end scrollbar gap-10 xl:gap-14 scrollbar-none lg:justify-center">
          {departments?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-auto"
            >
              <a
                href={item.link || "#"}
                class="flex flex-col items-center justify-center gap-1 text-gray-48 hover:text-firebrick transition-colors duration-150 ease-in font-sans"
              >
                <Image
                  src={item.image}
                  alt={item.description}
                  width={item.width || 100}
                  height={item.height || 100}
                  loading={item.loading}
                  class="h-[70px]"
                />
                <span class="text-xs leading-[35px] tracking-[0.05em] text-center">
                  {item.label}
                </span>
              </a>
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} scroll="smooth" />
      </div>
    </div>
  );
}

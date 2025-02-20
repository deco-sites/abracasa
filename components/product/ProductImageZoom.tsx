import { h } from "preact";
import { useSignal } from "@preact/signals";
import { asset } from "$fresh/runtime.ts";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import Modal from "$store/components/ui/ImagesModal.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { useId } from "$store/sdk/useId.ts";
import { ImageObject, VideoObject } from "apps/commerce/types.ts";

export interface Props {
  files: (ImageObject | VideoObject)[];
  width: number;
  height: number;
  showMadeiraLogo?: boolean;
}

export default function PrincipalImages({
  files,
  width: WIDTH,
  height: HEIGHT,
  showMadeiraLogo,
}: Props) {
  const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

  const handleMouseMove = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    if (self.window.innerWidth < 1024) return;

    const image = event.currentTarget;
    const boundingRect = image.getBoundingClientRect();

    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;

    const percentageX = (mouseX / boundingRect.width) * 100;
    const percentageY = (mouseY / boundingRect.height) * 100;

    image.style.transform = `scale(1.8)`;
    image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
    image.style.zIndex = "20";
  };

  const handleMouseLeave = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    const image = event.currentTarget;

    image.style.transform = "scale(1)";
    image.style.transformOrigin = "center center";
    image.style.zIndex = "0";
  };

  const id = useId();
  const isModalOpened = useSignal(false);
  const activedIndex = useSignal(0);

  const heroLabel = files.find((label) => label.name === "hero");
  const adjustedFiles = heroLabel
    ? [
      files[0],
      heroLabel,
      ...files.filter((item) => item !== heroLabel).slice(1),
    ]
    : files;

  return (
    <>
      <Slider class="carousel carousel-center gap-6 w-[90vw] sm:w-[40vw]">
        {adjustedFiles?.map((item, index) => {
          return (
            <Slider.Item index={index} class="carousel-item w-full relative">
              {item["@type"] === "ImageObject"
                ? (
                  <>
                    <img
                      id={`item-${index}`}
                      class="w-full duration-100 cursor-pointer"
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{
                        aspectRatio: ASPECT_RATIO,
                        transition: "transform 0.3s ease",
                      }}
                      src={item.url!}
                      alt={item.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      onMouseMove={(e) => handleMouseMove(e)}
                      onMouseLeave={(e) =>
                        handleMouseLeave(e)}
                      onClick={() => {
                        activedIndex.value = index;
                        isModalOpened.value = true;
                      }}
                      // Preload LCP image for better web vitals
                      preload={index === 0 ? "true" : "false"}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {showMadeiraLogo && index === 0 && (
                      <div class="absolute flex flex-col gap-1 z-10 top-4 right-4">
                        <img
                          src={asset("/image/madeira_natural.png")}
                          width={80}
                          height={80}
                          alt="Logo Madeira Natural"
                          loading="lazy"
                          class="w-[80px]"
                        />
                      </div>
                    )}
                  </>
                )
                : (
                  <iframe
                    id={`item-${index}`}
                    src={item.contentUrl!}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    alt={item.alternateName}
                    sizes="(max-width: 640px) 100vw, 40vw"
                    class="w-full h-full duration-100 cursor-pointer z-[5]"
                    style={{
                      aspectRatio: ASPECT_RATIO,
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => {
                      activedIndex.value = index;
                      isModalOpened.value = true;
                    }}
                    loading="lazy"
                  />
                )}
            </Slider.Item>
          );
        })}
      </Slider>

      {isModalOpened.value && (
        <div id={id} class="relative">
          <Modal
            class="w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center"
            loading="lazy"
            open={isModalOpened.value}
            onClose={() => {
              isModalOpened.value = false;
            }}
          >
            <button
              title="close modal button"
              aria-label="close images modal"
              onClick={() => {
                isModalOpened.value = false;
              }}
              class="absolute top-4 right-4"
            >
              <Icon size={24} id="XMark" strokeWidth={3} />
            </button>

            <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
              {files.map((item, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full h-full justify-center items-center"
                >
                  {item["@type"] === "ImageObject"
                    ? (
                      <Image
                        style={{ aspectRatio: `${700} / ${700}` }}
                        src={item.url!}
                        alt={item.alternateName}
                        width={720}
                        height={700}
                        class="h-full w-auto"
                        loading="lazy"
                      />
                    )
                    : (
                      <div class="w-full h-full inline-block">
                        <iframe
                          src={item.contentUrl!}
                          alt={item.alternateName}
                          width="100%"
                          height="100%"
                          class="h-full w-full aspect-video"
                          loading="lazy"
                        />
                      </div>
                    )}
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton class="btn btn-circle btn-outline col-start-1 col-end-2 row-start-1 row-span-full">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} loading="lazy" />
            </Slider.PrevButton>

            <Slider.NextButton class="btn btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
              <Icon
                size={24}
                id="ChevronRight"
                strokeWidth={3}
                loading="lazy"
              />
            </Slider.NextButton>

            <SliderJS rootId={id} activedIndex={activedIndex.value} />
          </Modal>
        </div>
      )}
    </>
  );
}

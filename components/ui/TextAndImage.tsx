import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  textAndImage?: {
    texts?: {
      text: HTMLWidget;
      textMob: HTMLWidget;
    }[];

    images?: {
      image: ImageWidget;
      description: string;
    }[];
  }[];
  textBelow?: boolean;
}

export default function TextAndImage({ textAndImage, textBelow }: Props) {
  return (
    <section
      class={`w-full h-full flex items-center justify-center border-b border-solid border-[#8282829f] ${
        textBelow ? "border-b-0 font-inter" : "border-b"
      }`}
    >
      <div
        class={`h-full flex items-center justify-center ${
          textBelow ? "max-w-[1230px]" : "max-w-[1200px] mx-6"
        }`}
      >
        <div
          class={`w-full h-full flex items-center justify-center  ${
            textBelow
              ? "flex-col-reverse lg:gap-[115px] gap-[76px] mt-[61px] lg:mt-[125px mb-[76px] lg:mb-[115px]"
              : "flex-col gap-2"
          }`}
        >
          {textAndImage?.map((item) => {
            const texts = item?.texts ?? [];
            const images = item?.images ?? [];

            return (
              <>
                {texts?.map((text) => (
                  <>
                    <div
                      class={`w-full h-full ${
                        textBelow ? "hidden lg:block" : ""
                      }`}
                    >
                      <p dangerouslySetInnerHTML={{ __html: text.text }} />
                    </div>
                    {textBelow && (
                      <div class="w-full h-full lg:hidden px-6">
                        <p dangerouslySetInnerHTML={{ __html: text.textMob }} />
                      </div>
                    )}
                  </>
                ))}

                {images?.map((image) => (
                  <div class="w-full h-full">
                    <img src={image.image} alt={image.description} />
                  </div>
                ))}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

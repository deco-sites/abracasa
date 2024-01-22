import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  textAndImage?: {
    texts?: {
      text: HTMLWidget;
    }[];

    images?: {
      image: ImageWidget;
      description: string;
    }[];
  }[];
}

export default function TextAndImage({ textAndImage }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-center border-b border-solid border-[#8282829f]">
      <div class="max-w-[1200px] h-full flex items-center justify-center mx-6">
        <div class="w-full h-full flex flex-col items-center justify-center gap-2">
          {textAndImage?.map((item) => {
            const texts = item?.texts ?? [];
            const images = item?.images ?? [];

            return (
              <>
                {texts?.map((text) => (
                  <div class="w-full h-full">
                    <p dangerouslySetInnerHTML={{ __html: text.text }} />
                  </div>
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
import type { SectionProps } from "deco/mod.ts";
import { RichText } from "apps/admin/widgets.ts";
import { useId } from "preact/hooks";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface layout {
  headerAlignment?: "center" | "left";
  /** @description Default is 12 */
  numberOfPosts?: number;
}

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  caption: string;
}

export interface Props {
  title?: string;
  description?: RichText;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;
  layout?: layout;
}

export default function InstagramPosts({
  title,
  description,
  data = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url: "",
      thumbnail_url: "",
      caption: "",
    },
  ],
}: SectionProps<typeof loader>) {
  if (!data || data.length === 0) return null;

  const id = useId();

  const hasManyItems = data.length <= 5;

  return (
    <div class="w-full container max-w-[1200px] px-4 pb-8 flex flex-col gap-4 lg:py-10 xl:px-0">
      <div class="flex flex-col gap-2 text-center">
        <h2 class="text-2xl leading-8 lg:leading-10 lg:text-3xl font-bold text-stone-600">
          {title}
        </h2>

        {description && (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr]"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-start-2 row-end-5 scrollbar-none gap-2">
          {data.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-1/2 sm:w-[290px] h-[200px] sm:h-[320px]"
            >
              <a
                key={item.id}
                href={item.permalink}
                target="_blank"
                title="Visite nosso instagram"
                class="rounded-lg overflow-hidden w-full group relative"
              >
                <span class="absolute right-2 top-2">
                  {item.media_type === "VIDEO"
                    ? (
                      <Icon
                        id="VideoIcon"
                        size={24}
                        class="text-white opacity-100 group-hover:opacity-0 duration-200 transition-all"
                      />
                    )
                    : (
                      <Icon
                        id="ImageGallery"
                        size={24}
                        class="text-white opacity-100 group-hover:opacity-0 duration-200 transition-all"
                      />
                    )}
                </span>

                <img
                  class="w-full h-full object-cover object-top group-hover:scale-110 transition duration-400 group-hover:brightness-90"
                  src={item.thumbnail_url || item.media_url}
                  alt="Imagem do instagram"
                  width={290}
                  height={320}
                  loading="lazy"
                />

                <div class="absolute inset-0 bg-black-base/50 z-10 transition-opacity duration-200 ease-in-out opacity-0 md:group-hover:opacity-100" />

                <div class="pointer-events-none absolute z-20 flex flex-col gap-0.5 items-center justify-center w-full text-center px-6 -bottom-1/2 opacity-0 md:group-hover:opacity-100 md:group-hover:bottom-6 duration-200 ease-in-out transition-all">
                  <div
                    class="text-xs text-white"
                    dangerouslySetInnerHTML={{ __html: item.caption }}
                  />
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        {!hasManyItems && (
          <>
            <div class="hidden relative lg:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export async function loader(
  {
    title,
    description,
    facebookToken,
    layout,
  }: Props,
  _req: Request,
) {
  const fields = [
    "media_url",
    "media_type",
    "permalink",
    "thumbnail_url",
    "caption",
  ];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from instagram", err);
    return { data: [] };
  })) as {
    data: Data[];
  };

  return {
    data: data.slice(0, layout?.numberOfPosts ?? 12),
    title,
    description,
    layout,
  };
}

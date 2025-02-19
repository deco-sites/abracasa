import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title?: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}
const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "Woman",
      matcher: "/*",
      subtitle: "As",
    },
  ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;
  if (!banner) {
    return null;
  }
  const { title, image } = banner;
  return (
    <div class="relative h-full overflow-y-hidden w-full">
      <Picture preload>
        <Source
          src={image.mobile}
          width={800}
          height={400}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1800}
          height={220}
          media="(min-width: 767px)"
        />
        <img
          class="w-full object-cover"
          src={image.desktop}
          alt={image.alt ?? title}
        />
      </Picture>
    </div>
  );
}
export interface Props {
  banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { banner };
};
export default Banner;

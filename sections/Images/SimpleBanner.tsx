import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  href?: string;
  desktopImage: {
    src: ImageWidget;
    width?: number;
    height?: number;
    alt?: string;
  };

  mobileImage: {
    src: ImageWidget;
    width?: number;
    height?: number;
    alt?: string;
  };
}

function SimpleBanner({ desktopImage, mobileImage, href }: Props) {
  return (
    <div class="w-full">
      {href ? (
        <a href={href}>
          <Image
            src={desktopImage.src}
            alt={desktopImage.alt}
            width={desktopImage.width ?? 1440}
            height={desktopImage.height ?? 685}
            loading="eager"
            decoding="async"
            class="hidden lg:block w-full"
          />

          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            width={mobileImage.width ?? 1004}
            height={mobileImage.height ?? 422}
            loading="eager"
            decoding="async"
            class="lg:hidden w-full"
          />
        </a>
      ) : (
        <>
          <Image
            src={desktopImage.src}
            alt={desktopImage.alt}
            width={desktopImage.width ?? 1440}
            height={desktopImage.height ?? 685}
            loading="eager"
            decoding="async"
            class="hidden lg:block w-full"
          />

          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            width={mobileImage.width ?? 1004}
            height={mobileImage.height ?? 422}
            loading="eager"
            decoding="async"
            class="lg:hidden w-full"
          />
        </>
      )}
    </div>
  );
}

export default SimpleBanner;

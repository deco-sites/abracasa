import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: {
    url: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
  };
  label: string;
  href: string;
}

export default function CategoryCard({ image, label, href }: Props) {
  return (
    <a
      href={href}
      class="flex flex-col gap-3 items-center justify-center h-full"
    >
      <figure class="flex items-center justify-center rounded-md w-full h-[120px] md:h-full p-1.5 md:p-[5px]">
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width ?? 150}
          height={image.height ?? 150}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <span class="text-gray-base w-full text-center text-[13px] lg:text-sm text-[#7A7A7A] capitalize min-h-[45px] tracking-[0.84px]">
        {label}
      </span>
    </a>
  );
}

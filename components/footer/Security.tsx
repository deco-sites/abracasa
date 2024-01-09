import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface SecurityItem {
  image: ImageWidget;
  description: string;
  link: string;
  target: "_blank" | "_self";
  width?: number;
  height?: number;
}

export default function SecurityMethods(
  { content }: { content?: { title?: string; items?: SecurityItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="text-sm">{content.title}</span>}
          <ul class="flex flex-wrap items-center gap-4">
            {content.items.map((item) => {
              return (
                <li class="max-w-[50px] max-h-[30px]">
                  <a
                    target={item.target || "_blank"}
                    class="w-full h-full"
                    href={item.link || "#"}
                  >
                    <Image
                      src={item.image}
                      alt={item.description}
                      width={item.width || 48}
                      height={item.height || 30}
                      loading="lazy"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

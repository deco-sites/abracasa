import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PaymentItem {
  image: ImageWidget;
  description: string;
  width?: number;
  height?: number;
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <span class="text-sm">{content.title}</span>}
          <ul class="flex flex-wrap items-center lg:max-w-[176px] gap-4">
            {content.items.map((item) => {
              return (
                <li class="w-[30px] h-[30px]">
                  <Image
                    src={item.image}
                    alt={item.description}
                    width={item.width || 30}
                    height={item.height || 30}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

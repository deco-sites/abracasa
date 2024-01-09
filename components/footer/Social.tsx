import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col md:items-center gap-4 border-y py-4 md:border-none md:py-0">
          {content.title && (
            <span class="text-sm md:text-center">{content.title}</span>
          )}
          <ul
            class={`grid grid-cols-6 md:grid-cols-3 md:items-center gap-4`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block text-[#828282]">
                      <Icon
                        size={30}
                        id={item.label}
                        strokeWidth={0.1}
                        loading="lazy"
                      />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
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

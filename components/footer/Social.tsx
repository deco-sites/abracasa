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
        <div class="flex flex-col items-center gap-4">
          {content.title && (
            <h3 class="text-sm text-center">{content.title}</h3>
          )}
          <ul
            class={`grid grid-cols-6 md:grid-cols-3 md:items-center gap-3`}
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
                    <span class="block p-1 border rounded-full">
                      <Icon size={24} id={item.label} />
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

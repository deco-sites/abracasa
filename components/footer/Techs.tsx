export interface TechItem {
  label: string;
  link: string;
  target: "_blank" | "_self";
}

export default function Techs(
  { content }: { content?: { title?: string; items?: TechItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1.5 text-xs leading-4 min-w-[120px]">
          {content.title && <span>{content.title}</span>}

          <ul class="flex flex-wrap divide-x items-center">
            {content.items.map((item) => (
              <li class="pr-2 first:pl-0 last:pr-0 pl-2">
                <a
                  href={item.link}
                  target={item.target || "_blank"}
                  class="font-bold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

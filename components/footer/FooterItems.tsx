import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <ul
          class={`flex flex-col lg:flex-row gap-6 lg:gap-28 ${
            justify && "lg:justify-between"
          }`}
        >
          {sections.map((section) => (
            <li>
              <div class="flex flex-col gap-2">
                <span class="text-sm">
                  {section.label}
                </span>
                <ul class={`flex flex-col gap-2 flex-wrap text-xs`}>
                  {section.items?.map((item) => (
                    <li>
                      <a href={item.href} class="block py-1">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

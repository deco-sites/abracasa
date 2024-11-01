import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Abra Casa", item: "/" }, ...itemListElement];

  return (
    <div class="breadcrumbs">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="text-[#828282] last:text-firebrick text-xs lg:text-[11px]">
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;

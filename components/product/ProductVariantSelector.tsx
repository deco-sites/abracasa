import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  const sortedPossibilities = Object.entries(possibilities)
    .map(([key, values]) => {
      const sortedValues = Object.entries(values)
        .sort(([sizeA], [sizeB]) =>
          parseFloat(sizeA.replace(",", ".")) -
          parseFloat(sizeB.replace(",", "."))
        );

      return [key, Object.fromEntries(sortedValues)];
    });

  return (
    <ul className="flex flex-col gap-4 max-w-[60%]">
      {sortedPossibilities.map(([name, values]) => (
        <li className="flex flex-col gap-2" key={name}>
          <span className="text-sm">{name}</span>
          <ul className="grid grid-cols-3 gap-x-1.5 gap-y-3">
            {Object.entries(values).map(([value, link]) => (
              <li key={value}>
                <button f-partial={link} f-client-nav>
                  <Avatar
                    content={value}
                    variant={link === url
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;

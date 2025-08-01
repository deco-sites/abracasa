import { useState } from "preact/compat";

import Button from "$store/components/ui/Button.tsx";

import MobileSort from "$store/components/search/MobileSort.tsx";

import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  sortParam?: "legacy" | "intelligent";
};

export default function MobileSortButton({ sortOptions, sortParam }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        hasBtnClass={false}
        class="flex items-center justify-between text-[#555555] bg-[#f2f2f2] text-[14px] lg:text-[13px] w-full max-w-[160px] py-[11px] px-[12px]"
        onClick={() => setOpen(true)}
      >
        Ordenar
        <Icon
          id="ChevronDownFilter"
          width={15}
          height={9}
          strokeWidth={2}
          loading="lazy"
        />
      </Button>

      {open && (
        <MobileSort
          sortParam={sortParam}
          sortOptions={sortOptions}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

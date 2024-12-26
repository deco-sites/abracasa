import { useState } from "preact/compat";

import Button from "$store/components/ui/Button.tsx";

import MobileSort from "$store/components/search/MobileSort.tsx";

import { ProductListingPage } from "apps/commerce/types.ts";

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  sortParam?: "legacy" | "intelligent";
};

export default function MobileSortButton({ sortOptions, sortParam }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        hasBtnClass={false}
        class="flex items-center justify-center text-[#555555] bg-[#f2f2f2] text-[15px] lg:text-[13px] w-full max-w-[80px] py-2 px-[13px]"
        onClick={() => setOpen(true)}
      >
        Ordenar
      </Button>

      {open && <MobileSort sortParam={sortParam} sortOptions={sortOptions} setOpen={setOpen} />}
    </>
  );
}

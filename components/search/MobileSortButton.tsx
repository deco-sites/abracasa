import { useState } from "preact/compat";

import Button from "$store/components/ui/Button.tsx";

import MobileSort from "$store/components/search/MobileSort.tsx";

import { ProductListingPage } from "apps/commerce/types.ts";

export type Props = Pick<ProductListingPage, "sortOptions">;

export default function MobileSortButton({ sortOptions }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        hasBtnClass={false}
        class="flex items-center justify-center text-black bg-[#f2f2f2] text-[15px] lg:text-[13px] w-full max-w-[80px] py-[6px] px-[13px]"
        onClick={() => setOpen(true)}
      >
        Ordenar
      </Button>

      {open && <MobileSort sortOptions={sortOptions} setOpen={setOpen} />}
    </>
  );
}

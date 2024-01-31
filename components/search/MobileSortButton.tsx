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
        class="flex items-center justify-center text-black bg-[#f2f2f2] text-[15px] w-full max-w-[80px] h-[30px] p-1"
        onClick={() => setOpen(true)}
      >
        Ordenar
      </Button>

      {open && <MobileSort sortOptions={sortOptions} setOpen={setOpen} />}
    </>
  );
}

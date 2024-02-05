import { asset } from "$fresh/runtime.ts";

export interface StoreInfo {
  className?: string;
  title: string;
  local: string;
  phone: string;
  links: string[];
}

function StoreInfo({ title, phone, links, local }: StoreInfo) {
  return (
    <div class="flex flex-col items-start justify-start gap-2 w-full leading-5 text-[13px]">
      <h4 class="text-rosybrown uppercase font-semibold">{title}</h4>
      <p>{local}</p>
      {links.map((item) => (
        <a
          href={item}
          target="_blank"
          class="flex items-center justify-center gap-2"
        >
          <span>
            {phone}
          </span>
          <img
            class="object-cover"
            src={asset("/image/logo_whatsapp.svg")}
            width={22}
            height={22}
            alt="Logo do Whatsapp"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

export default StoreInfo;

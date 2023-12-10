import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  departments: Array<{
    link: string;
    label: string;
    image: ImageWidget;
    description: string;
    loading: "lazy" | "eager";
    width?: number;
    height?: number;
  }>;
}

export default function Departments({ departments = [] }: Props) {
  return (
    <div class="flex items-center lg:justify-center mx-auto gap-6 lg:gap-16 lg:max-w-[80%] px-4 lg:px-0 overflow-x-scroll w-full py-6">
      {departments?.map((item) => (
        <a
          href={item.link || "#"}
          class="flex flex-col items-center justify-center gap-1 hover:text-[#c2024a]"
        >
          <Image
            src={item.image}
            alt={item.description}
            width={item.width || 100}
            height={item.height || 100}
            loading={item.loading}
            class="rounded-full min-h-[100p] min-w-[100px]"
          />
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
}

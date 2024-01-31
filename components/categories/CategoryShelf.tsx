import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import CategoryCard, { Props as CategoryProps } from "./CategoryCard.tsx";

export interface Props {
  categories: CategoryProps[];
}

function CategoryShelf({
  categories,
}: Props) {
  const id = useId();

  if (!categories || categories.length === 0) {
    return null;
  }

  const hasManyItems = categories.length <= 5;

  return (
    <div
      id={id}
      class={`${
        hasManyItems && "lg:place-items-center"
      } group container w-full sm:w-[1180px] flex-row grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] px-5 lg:px-0 mb-2 lg:mb-12`}
    >
      <Slider class="carousel carousel-center snap-mandatory scroll-smooth sm:snap-end gap-6 md:gap-12 col-span-full row-start-2 row-end-5 lg:mt-8">
        {categories?.map((category, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[120px] md:w-[180px] mb-4 group-hover:opacity-60 group-hover:hover:opacity-100 transition-opacity duration-300"
          >
            <CategoryCard {...category} />
          </Slider.Item>
        ))}
      </Slider>

      {!hasManyItems && (
        <>
          <div class="hidden relative lg:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
      )}

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryShelf;

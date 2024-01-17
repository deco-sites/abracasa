import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

import type { HTMLWidget } from "apps/admin/widgets.ts";

export type TAlert = HTMLWidget;

export interface Props {
  alerts?: TAlert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = "alert-slider";

  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-screen bg-[#d9d9d9] gap-6 h-[33px]">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <div
              dangerouslySetInnerHTML={{ __html: alert }}
              class="text-sm text-secondary-content flex justify-center items-center w-screen h-full"
            />
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;

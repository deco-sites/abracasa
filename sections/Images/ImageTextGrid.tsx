import { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Image {
    src: ImageWidget;
    alt?: string;
}

export interface ImageTextGridProps {
    images: Image[];
    text: RichText;
}

const ImageTextGrid = ({ images, text }: ImageTextGridProps) => {
    return (
        <div class="w-full mt-[72px] lg:mt-[149px] font-inter">
            <div class="flex justify-center">
                <div class="w-full max-w-[1440px] px-6 md:px-[106px] flex flex-col lg:flex-row gap-12 lg:gap-[106px]">
                    <div class="
              w-full
              min-h-[190px]
              md:min-w-[270px]
              lg:max-w-[709px]
              max-h-[415px]
              grid grid-cols-4
              auto-rows-[92px] md:auto-rows-[200px]
              gap-[6px] md:gap-4
              flex-grow
              max-w-full
              min-w-0
            ">
                        {images.map((image, index) => {
                            let className = "col-span-2";

                            if (index === 1) {
                                className += " row-span-2";
                            }

                            return (
                                <div
                                    key={image.src + index}
                                    className={className}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div class="
              w-full
              flex justify-center items-center
              flex-grow
              md:min-w-[300px]
              lg:max-w-[356px]
              max-w-full
              min-w-0
            ">
                        <div
                            class="font-normal text-sm text-justify hyphens-auto md:hyphens-none md:text-left  md:text-base text-[#626262]"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageTextGrid;

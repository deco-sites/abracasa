interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-3 px-[20px] lg:px-0 ${props.alignment === "left" ? "text-left" : "text-center"
              }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-2xl  leading-8 lg:leading-10
                  ${props.colorReverse ? "text-primary-content" : "text-dimgray"
                    }
                  ${props.fontSize === "Small" ? 'lg-text-2xl' : props.fontSize === "Normal"
                      ? "lg:text-3xl"
                      : "lg:text-4xl leading-[49px]"
                    }
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`
                  leading-6 lg:leading-8
                  ${props.colorReverse ? "text-primary-content" : "text-dimgray"
                    }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;

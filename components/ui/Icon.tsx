import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Location"
  | "Arrows"
  | "Baloons"
  | "Car"
  | "Group"
  | "Padlock"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "ChevronDownFilter"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "Spotify"
  | "Pinterest"
  | "FilterList"
  | "Heart"
  | "HeartOutline"
  | "Store"
  | "Share"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "VideoPlay"
  | "Mastercard"
  | "Message"
  | "Youtube"
  | "Exchange"
  | "OurStores"
  | "UserIcon"
  | "Cart"
  | "Clock"
  | "PhysicalStores"
  | "OneColumn"
  | "TwoColumns"
  | "ThreeColumns"
  | "FourthColumns"
  | "Payment"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "DiscountCaret"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "Attendance"
  | "Design"
  | "Practicality"
  | "Products"
  | "XMark"
  | "Zoom";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;

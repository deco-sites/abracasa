import "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "pa-widget-legacy": unknown;
    }
  }
}

export default function PersonalShopper() {
  return (
    <>
      <script
        type="module"
        id="pa-widget-script"
        src="https://cdn-personalshopper.nizza.com/widget-script/prod/pa-ws-index.js?account=abracasa"
      />

      <pa-widget-legacy></pa-widget-legacy>
    </>
  );
}

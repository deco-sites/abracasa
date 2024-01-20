export default function Viewer() {
  function handleGenerateComponents() {
    self.addEventListener("DOMContentLoaded", async () => {
      const skuId = document.getElementById("referenceId")?.innerText?.replace(
        "ID: ",
        "",
      ).toLocaleLowerCase();

      if (!skuId) return;

      // deno-lint-ignore no-explicit-any
      const window_ = window as Window & { R2U?: any };

      await window_.R2U.init({
        customerId: "963e17e8-997b-4a4f-b1f4-7160e13a21e8",
      });

      const isActive = await window_.R2U.sku.isActive(skuId);

      if (!isActive) return;

      const viewerPosition = document.getElementById("r2u-viewer");
      const qrCode = document.getElementById("qrCode");

      if (viewerPosition) {
        await window_.R2U.viewer.create({
          element: viewerPosition,
          sku: skuId,
          popup: true,
        });
      }

      if (qrCode) {
        await window_.R2U.qrCode.create({
          element: qrCode,
          sku: skuId,
        });
      }
    });
  }

  return (
    <>
      <script src="https://unpkg.com/@r2u/javascript-ar-sdk/dist/index.js" />

      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `(${handleGenerateComponents.toString()})()`,
        }}
      />
    </>
  );
}

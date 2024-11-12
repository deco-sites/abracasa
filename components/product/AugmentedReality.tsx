import { useScript } from "@deco/deco/hooks";
export default function Viewer() {
    function handleGenerateComponents() {
        self.addEventListener("DOMContentLoaded", async () => {
            const referenceId = document.getElementById("referenceId")?.innerText
                ?.replace("ID: ", "").toLocaleUpperCase();
            if (!referenceId)
                return;
            // deno-lint-ignore no-explicit-any
            const window_ = window as Window & {
                R2U?: any;
            };
            await window_.R2U.init({
                customerId: "963e17e8-997b-4a4f-b1f4-7160e13a21e8",
            });
            const isActive = await window_.R2U.sku.isActive(referenceId);
            if (!isActive)
                return;
            const viewerPosition = document.getElementById("r2u-viewer");
            const qrCode = document.getElementById("qrCode");
            const qrCodeText = document.getElementById("qrCodeText");
            const arButton = document.getElementById("arButton");
            if (viewerPosition) {
                await window_.R2U.viewer.create({
                    element: viewerPosition,
                    sku: referenceId,
                    popup: true,
                });
            }
            if (qrCode) {
                await window_.R2U.qrCode.create({
                    element: qrCode,
                    sku: referenceId,
                });
                qrCodeText!.innerText = "Veja no seu espaço";
            }
            if (arButton) {
                await window_.R2U.ar.attach({
                    element: arButton,
                    sku: referenceId,
                });
                arButton.classList.remove("hidden");
                arButton.classList.add("flex");
            }
        });
    }
    return (<>
      <script src="https://unpkg.com/@r2u/javascript-ar-sdk/dist/index.js"/>

      <script defer dangerouslySetInnerHTML={{
            __html: useScript(handleGenerateComponents),
        }}/>
    </>);
}

import { useEffect } from "preact/hooks";
/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
    const getCurrentPath = window.location.pathname;
    console.log(getCurrentPath, "passa path")
    useEffect(() => {
        console.log("logando o notfound");
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': "page_not_found",
            'url': getCurrentPath
        });
    }, []);

    return (
        <div class="w-full flex justify-center items-center py-28">
            <div class="flex flex-col items-center justify-center gap-6">
                <span class="font-medium text-2xl">Página não encontrada</span>
                <a href="/" class="btn no-animation">
                    Voltar à página inicial
                </a>
            </div>
        </div>
    );
}

export default NotFound;

import { Head } from "$fresh/runtime.ts";

export default function CustomGTM() {
    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://desvendado.abracasa.com.br/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KNSPM599');`,
                    }}
                />
            </Head>

            <noscript>
                <iframe
                    src="https://desvendado.abracasa.com.br/ns.html?id=GTM-KNSPM599"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
        </>
    );
}

import { useEffect, useState } from "preact/hooks";
import storesHTML from "./storesHTML.ts";

interface StockItem {
  properties: {
    title: string;
  };
  data: {
    rowData: Array<{ values: Array<{ formattedValue: string }> }>;
  }[];
}

interface StockData {
  sheets: StockItem[];
}

interface LiveProductProps {
  refId: string;
}

interface StoreInfo {
  className: string;
  title: string;
  local: string;
  phone: string;
  links: string[];
}

interface UseStoresResult {
  loading: boolean;
  filteredStores: StoreInfo[];
}

function parseHTMLToStoreArray(html: string): StoreInfo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const lojas: StoreInfo[] = [];

  const liElements = doc.querySelectorAll("li");

  liElements.forEach((element) => {
    const className = element.getAttribute("class") || "";
    const title = element.querySelector("h4")?.textContent?.trim() || "";
    const local =
      element.querySelector("p:nth-of-type(1)")?.textContent?.trim() || "";
    const phone =
      element.querySelector("p:nth-of-type(2)")?.textContent?.trim() || "";

    const links: string[] = [];
    element.querySelectorAll("a").forEach((linkElement) => {
      const href = linkElement.getAttribute("href") || "";
      links.push(href);
    });

    lojas.push({ className, title, local, phone, links });
  });

  return lojas;
}

export function useStores(props: LiveProductProps): UseStoresResult {
  const storeArray = parseHTMLToStoreArray(storesHTML);
  const [filteredStores, setFilteredStores] = useState<StoreInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const stockData = await getStockData();
      getLojas(stockData, props.refId);
      setLoading(false);
    }

    fetchData();
  }, [props.refId]);

  async function getStockData() {
    try {
      const apiKey = "AIzaSyBrrO7AEU5h8FMdE2YipRZ9-8uTt-oZrXU";
      const url =
        `https://sheets.googleapis.com/v4/spreadsheets/1MQJnfXASX3Ayw4EadYwQ8CVeGP88zQyhn65hm0QQC0I/?key=${apiKey}&includeGridData=true`;

      const response = await fetch(url);
      const data: StockData = await response.json();
      return data.sheets;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function getLojas(data: StockItem[], refId: string) {
    const stores: StockItem[] = [];
    const filteredStores: StoreInfo[] = [];

    data.forEach((t) => {
      t.data?.[0]?.rowData.forEach((y) => {
        if (
          y?.values?.[0]?.formattedValue &&
          y?.values?.[0]?.formattedValue.toLowerCase().replace(" ", "") ===
            refId?.toLowerCase()
        ) {
          const storeInfo: StockItem = {
            properties: {
              title: t.properties.title.toLowerCase().replaceAll(" ", "-"),
            },
            data: t.data,
          };
          stores.push(storeInfo);
          const matchingStore = storeArray.find((item) =>
            item.className === storeInfo.properties.title
          );
          if (matchingStore) {
            filteredStores.push(matchingStore);
          }
        }
      });
    });

    setFilteredStores(filteredStores);
  }

  return { loading, filteredStores };
}

import { useEffect, useState } from "preact/hooks";
import storesJSON from "./storesData.ts";

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

export function useStores(props: LiveProductProps): UseStoresResult {
  const storeArray: StoreInfo[] = storesJSON;
  const [filteredStores, setFilteredStores] = useState<StoreInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const stockData = await getStockData();
      getStores(stockData, props.refId);
      setLoading(false);
    }

    fetchData();
  }, [props.refId]);

  async function getStockData() {
    try {
      const url =
        `https://sheets.googleapis.com/v4/spreadsheets/1nnaI3ngTySVPeCseXQ77SdBfPgbt2TPLjUEutbm6T0c?fields=sheets(properties(title),data.rowData.values.formattedValue)&key=AIzaSyBrrO7AEU5h8FMdE2YipRZ9-8uTt-oZrXU`;

      const response = await fetch(url);
      const data: StockData = await response.json();
      return data.sheets;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function getStores(data: StockItem[], refId: string) {
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
              title: t.properties.title,
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

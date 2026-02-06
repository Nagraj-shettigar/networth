// core/data/asset-catalog.ts
export interface AssetCatalogItem {
  symbol: string;
  name: string;
  type: 'Stock' | 'ETF' | 'Index';
}

export const ASSET_CATALOG: AssetCatalogItem[] = [
  { symbol: '^NSEI', name: 'NIFTY 50', type: 'Index' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', type: 'Stock' },
  { symbol: 'CANBK.NS', name: 'Canara Bank', type: 'Stock' },
  { symbol: 'SILVERBEES.NS', name: 'Nippon India Silver ETF', type: 'ETF' },
  { symbol: 'TATAGOLD.NS', name: 'Tata Gold ETF', type: 'ETF' }
];

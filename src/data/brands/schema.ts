export type DataVerificationStatus = 'measured' | 'vendor' | 'historical' | 'pending';

export type UnlockStatus = 'supported' | 'partial' | 'unsupported' | 'vendor' | 'untested';

export interface BrandPricingPlan {
  name: string;
  billingCycle: '月付' | '季付' | '半年付' | '年付' | '两年付' | '三年付' | '一次性付费' | '待核实';
  price: string;
  numericMonthlyEstimate?: number;
  isAnnualAveragedNote?: string;
  traffic: string;
  resetRule: '每月重置' | '一次性不过期' | '待核实';
  highlight?: boolean;
  notes?: string;
}

export interface NodeSpeedMetric {
  region: string;
  latency: string;
  download: string;
  upload?: string;
  packetLoss?: string;
  status: 'operational' | 'stable' | 'partial' | 'untested';
}

export interface StreamingAIMatrix {
  chatgpt: UnlockStatus;
  claude: UnlockStatus;
  gemini: UnlockStatus;
  netflix: UnlockStatus;
  disneyPlus: UnlockStatus;
  youtube: UnlockStatus;
  hboMax: UnlockStatus;
  tiktok: UnlockStatus;
  spotify: UnlockStatus;
  notes: string;
}

export interface BrandProfile {
  rankOrder: number;
  slug: string;
  name: string;
  englishName: string;
  aliases: string[];
  isPrimarySponsor?: boolean;
  isTopTen?: boolean;
  dataStatus: DataVerificationStatus;
  statusLabel: string;
  foundedYear: string;
  logo?: string;
  accentColor: string;
  entryPriceLabel: string;
  entryMonthlyNumeric: number;
  isAnnualConvertedPrice: boolean;
  minMonthlyDirectPrice?: number;
  baseTrafficLabel: string;
  baseTrafficGB: number;
  lineType: string;
  lineCategory: 'IEPL专线' | 'IPLC专线' | 'BGP中转/混合' | '待核实';
  protocols: string[];
  clientSupport: '自研+通用订阅' | '仅专属客户端' | '通用订阅' | '待核实';
  supportedClients: string[];
  regions: string[];
  paymentMethods: string[];
  summary: string;
  positioning: string;
  highlights: string[];
  limitations: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  riskNotes: string[];
  discrepancyNotes: string[];
  plans: BrandPricingPlan[];
  speedTest: {
    testDate: string;
    testEnv: string;
    hasMeasuredData: boolean;
    nodes: NodeSpeedMetric[];
    summaryNote: string;
  };
  unlockMatrix: StreamingAIMatrix;
  faq: { q: string; a: string }[];
  sourceDoc: string;
  verifiedDate: string;
  updatedDate: string;
}

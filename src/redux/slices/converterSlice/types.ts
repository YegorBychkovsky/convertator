export type FetchLoginParams = {
  url: string;
};

// var myHeaders = ;
// myHeaders.append('apikey', 'TmFsk3yYhfWhCxlgvxy4zuLBET4tRAZ7');
type ExchangeRates = {
  baseCurrency: string;
  currency: string;
  purchaseRateNB: number;
  saleRateNB: number;
};

export type FetchConvertType = {
  exchangeRate: ExchangeRates[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ConverterStateType = {
  currency1: string;
  currency2: string;
  value1: number;
  value2: number;
  status: Status;
  response: FetchConvertType | null;
};

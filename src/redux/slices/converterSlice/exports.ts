import { RootState } from '../../store';

export const value1Select = (state: RootState) => state.converter.value1;
export const value2Select = (state: RootState) => state.converter.value2;
export const currency1Select = (state: RootState) => state.converter.currency1;
export const currency2Select = (state: RootState) => state.converter.currency2;
export const responseSelect = (state: RootState) => state.converter.response?.exchangeRate;

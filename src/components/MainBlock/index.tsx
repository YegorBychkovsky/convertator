import {
  Stack,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currency1Select,
  currency2Select,
  responseSelect,
  value1Select,
  value2Select,
} from '../../redux/slices/converterSlice/exports';
import {
  addCurrency1,
  addCurrency2,
  addValue1,
  addValue2,
  fetchingConvert,
} from '../../redux/slices/converterSlice/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './MainBlock.module.scss';

const url = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=26.09.2022';

const MainBlock = () => {
  const dispatch = useAppDispatch();
  const dsptch = useDispatch();

  const firstCurrency = useSelector(currency1Select);
  const secondCurrency = useSelector(currency2Select);

  const firstCurrencyValue = useSelector(value1Select);
  const secondCurrencyValue = useSelector(value2Select);

  const response = useSelector(responseSelect);

  const handleChangeFirstCurrency = (event: SelectChangeEvent) => {
    dsptch(addCurrency1(event.target.value as string));
  };
  const handleChangeSecondCurrency = (event: SelectChangeEvent) => {
    dsptch(addCurrency2(event.target.value as string));
  };

  const handleChangeFirstCurrencyValue = (event: any) => {
    dsptch(addValue1(Number(event.target.value)));
  };

  const convertFunction = () => {
    if (secondCurrency === 'UAH') {
      const exchangeRate = response?.find(
        (pair) => pair.currency === firstCurrency,
      )?.purchaseRateNB;
      if (exchangeRate !== undefined) {
        dsptch(addValue2(exchangeRate * firstCurrencyValue));
      }
    }
    if (firstCurrency === 'UAH') {
      const exchangeRate = response?.find(
        (pair) => pair.currency === secondCurrency,
      )?.purchaseRateNB;
      if (exchangeRate !== undefined) {
        dsptch(addValue2(firstCurrencyValue / exchangeRate));
      }
    }
  };

  React.useEffect(() => {
    dispatch(fetchingConvert({ url }));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Converter</h1>
      <div className={styles.converter}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={firstCurrency}
              label="Age"
              onChange={handleChangeFirstCurrency}>
              <MenuItem value={'UAH'}>UAH</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
              {secondCurrency === 'USD' ? null : <MenuItem value={'EUR'}>EUR</MenuItem>}
            </Select>
            <TextField
              id="filled-basic"
              label="Value"
              variant="filled"
              onChange={handleChangeFirstCurrencyValue}
            />
          </FormControl>
        </Box>
        <div style={{ width: 30 }}></div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={secondCurrency}
              label="Age"
              onChange={handleChangeSecondCurrency}>
              <MenuItem value={'UAH'}>UAH</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
              {firstCurrency === 'USD' ? null : <MenuItem value={'EUR'}>EUR</MenuItem>}
            </Select>
            <TextField
              sx={{ pointerEvents: 'none' }}
              id="filled-basic"
              label={secondCurrencyValue}
              variant="filled"
            />
          </FormControl>
        </Box>
      </div>
      <br />
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={convertFunction}>
          Convert
        </Button>
      </Stack>
      <h4>Result</h4>
    </div>
  );
};
export default MainBlock;

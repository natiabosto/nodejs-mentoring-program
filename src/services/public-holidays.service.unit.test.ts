import axios, { AxiosResponse } from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service'; // Import your functions to test
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { validateInput, shortenPublicHoliday } from '../helpers';

jest.mock('axios'); // Mock axios for testing

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getListOfPublicHolidays', () => {
  const YEAR = 2024;
  const COUNTRY = 'US';
  const EXPECTED_URL = `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${YEAR}/${COUNTRY}`;
  const MOCK_PUBLIC_HOLIDAYS = [{ name: 'New Year', date: '2024-01-01' }];

  test('should call API with proper arguments and return list of public holidays', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: MOCK_PUBLIC_HOLIDAYS } as AxiosResponse);
    const result = await getListOfPublicHolidays(YEAR, COUNTRY);
    const mappedResult = result.map((holiday) => ({
      name: holiday.name,
      date: holiday.date,
      // Add other properties if needed
    }));
    const shortenedResult = mappedResult.map(shortenPublicHoliday);
    expect(shortenedResult).toEqual(MOCK_PUBLIC_HOLIDAYS.map(shortenPublicHoliday));
    expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_URL);
  });

  test('should return an empty array if API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
    const result = await getListOfPublicHolidays(YEAR, COUNTRY);
    expect(result).toEqual([]);
  });
});

describe('checkIfTodayIsPublicHoliday', () => {
  const COUNTRY = 'US';
  const EXPECTED_URL = `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${COUNTRY}`;

  test('should call API with proper arguments and return true if today is a public holiday', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200 } as AxiosResponse);
    const result = await checkIfTodayIsPublicHoliday(COUNTRY);
    expect(result).toBe(true);
    expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_URL);
  });

  test('should return false if today is not a public holiday', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 404 } as AxiosResponse);
    const result = await checkIfTodayIsPublicHoliday(COUNTRY);
    expect(result).toBe(false);
    expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_URL);
  });

  test('should return false if API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
    const result = await checkIfTodayIsPublicHoliday(COUNTRY);
    expect(result).toBe(false);
  });
});

describe('getNextPublicHolidays', () => {
  const COUNTRY = 'US';
  const EXPECTED_URL = `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${COUNTRY}`;
  const MOCK_PUBLIC_HOLIDAYS = [{ name: 'New Year', date: '2024-01-01' }];

  test('should call API with proper arguments and return list of next public holidays', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: MOCK_PUBLIC_HOLIDAYS } as AxiosResponse);
    const result = await getNextPublicHolidays(COUNTRY);
    const mappedResult = result.map((holiday) => ({
      name: holiday.name,
      date: holiday.date,
      // Add other properties if needed
    }));
    const shortenedResult = mappedResult.map(shortenPublicHoliday);
    expect(shortenedResult).toEqual(MOCK_PUBLIC_HOLIDAYS.map(shortenPublicHoliday));
    expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_URL);
  });

  test('should return an empty array if API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
    const result = await getNextPublicHolidays(COUNTRY);
    expect(result).toEqual([]);
  });
});

import { validateInput, shortenPublicHoliday } from './helpers';
import { SUPPORTED_COUNTRIES } from './config';

const VALID_INPUTS = {
  year: new Date().getFullYear(),
  country: SUPPORTED_COUNTRIES[0],
};

const INVALID_INPUTS = {
  year: new Date().getFullYear() - 1,
  country: 'FalseCountry',
};

const PUBLIC_HOLIDAY = {
  date: '2024-01-01',
  localName: 'ახალი წელი',
  name: "New Year's Day",
  countryCode: 'GE',
  fixed: false,
  global: true,
  counties: null,
  launchYear: null,
  types: ['Public'],
};

const SHORTEDENED_PUBLIC_HOLIDAY = {
  name: "New Year's Day",
  localName: 'ახალი წელი',
  date: '2024-01-01',
};

describe('Validate inputs of Country and Year', () => {
  test('should return true if Country is supported and Year is current', () => {
    const validationResult = validateInput({
      year: VALID_INPUTS.year,
      country: VALID_INPUTS.country,
    });

    expect(validationResult).toEqual(true);
  });
  test('shoud throw error if Country is not supported', () => {
    const INVALID_COUNTRY_ERROR = `Country provided is not supported, received: ${INVALID_INPUTS.country}`;

    expect(() =>
      validateInput({
        country: INVALID_INPUTS.country,
      })
    ).toThrow(INVALID_COUNTRY_ERROR);
  });

  test('should throw error if Year is not current', () => {
    const INVALID_YEAR_ERROR = `Year provided not the current, received: ${INVALID_INPUTS.year}`;

    expect(() =>
      validateInput({
        year: INVALID_INPUTS.year,
      })
    ).toThrow(INVALID_YEAR_ERROR);
  });
});

describe('Validate shortening of public holiday', () => {
  test('should return shortened public holiday', () => {
    expect(shortenPublicHoliday(PUBLIC_HOLIDAY)).toEqual(
      SHORTEDENED_PUBLIC_HOLIDAY
    );
  });
});

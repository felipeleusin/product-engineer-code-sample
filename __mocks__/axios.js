/* eslint-disable import/no-extraneous-dependencies */
import mockAxios from 'jest-mock-axios'

export default {
  ...mockAxios,
  ...{
    create: jest.fn(() => ({
      ...mockAxios,
      defaults: {
        headers: {
          common: {},
        },
      },
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    })),
  },
}

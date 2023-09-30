import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExchangeButton from '../components/ExchangeButton'

describe('ExchangeButton component', () => {
  it('Should call setFromCoin and setToCoin functions on click', () => {

    const fromCoin = 'USD';
    const toCoin = 'EUR';

    const setFromCoinMock = jest.fn();
    const setToCoinMock = jest.fn();

    const { container } = render(
      <ExchangeButton
        fromCoin={fromCoin}
        setFromCoin={setFromCoinMock}
        toCoin={toCoin}
        setToCoin={setToCoinMock}
      />
    );

    const button = container.firstChild;
    fireEvent.click(button);

    expect(setFromCoinMock).toHaveBeenCalledWith(toCoin);
    expect(setToCoinMock).toHaveBeenCalledWith(fromCoin);
  });
});
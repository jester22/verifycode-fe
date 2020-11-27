import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VerifyCode from '../VerifyCode';

describe('VerifyCode component', () => {
  it('renders without crashing', () => {
    const container = render(<VerifyCode codeLength={6}/>);
    expect(container).not.toBeNull();
  });

  it('should display 6 input boxes', () => {
    const { getAllByTestId } = render(<VerifyCode codeLength={6}/>);
    const inputs = getAllByTestId('input');
    expect(inputs.length).toBe(6);
  });

  it('should display 10 input boxes', () => {
    const { getAllByTestId } = render(<VerifyCode codeLength={10}/>);
    const inputs = getAllByTestId('input');
    expect(inputs.length).toBe(10);
  });

  it('should highlight empty inputs as error after submit', async () => {
    const { getByText, getAllByTestId } = render(<VerifyCode codeLength={10}/>);
    const button = getByText('Submit');
    const inputs = getAllByTestId('input');
    await fireEvent.click(button)
    const hasErrorClassName = (inputs[0].firstChild as HTMLElement).className.includes('Mui-error');
    expect(hasErrorClassName).toBe(true);
  });
})


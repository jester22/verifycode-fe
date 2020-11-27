import React from 'react';
import { render } from '@testing-library/react';
import Success from '../Success';

describe('Success component', () => {
  it('renders without crashing', () => {
    const container = render(<Success />);
    expect(container).not.toBeNull();
  });
})


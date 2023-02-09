/** @format */

import {createContext} from 'react';

interface TFollowerContext {
  isPaid: boolean;
  setIsPaid: (isPaid: boolean) => void;
}

export const Context = createContext<TFollowerContext>({
  isPaid: false,
  setIsPaid: (_isPaid: boolean) => {},
});

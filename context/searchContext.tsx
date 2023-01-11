/* eslint-disable require-jsdoc */
import moment, {Moment} from 'moment';
import React from 'react';
import {setDates, setRange, setFeaturedListing} from './actionNames';

export interface IModalContext {
  startDate: Moment;
  endDate: Moment;
  wantedDates: string[];
}

export const SearchContext = React.createContext<any>({
  startDate: moment(),
  endDate: moment(),
  wantedDates: [],
});

const INITIAL_STATE = {
  startDate: moment(),
  endDate: moment(),
  wantedDates: [],
  featuredListing: '',
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case setDates:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    case setRange:
      return {
        ...state,
        wantedDates: action.payload,
      };
    case setFeaturedListing:
      return {
        ...state,
        featuredListing: action.payload,
      };
    default:
      throw new Error();
  }
}

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer<any>(reducer, {
    ...INITIAL_STATE,
  });

  return (
    <SearchContext.Provider value={{state, dispatch}}>
      {children}
    </SearchContext.Provider>
  );
}

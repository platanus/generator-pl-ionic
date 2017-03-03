import { Action } from '@ngrx/store';
import { <%= storeNameCapitalized %>Actions } from './';

export type <%= storeNameCapitalized %>State = {
  data: { [id: string]: any },
}

const initialState: <%= storeNameCapitalized %>State = {
  reports: {},
};

export function <%= storeName %>Reducer(state: <%= storeNameCapitalized %>State = initialState, action: Action) {
  switch (action.type) {
    case <%= storeNameCapitalized %>Actions.EXAMPLE_SUCCESS: {
      let newState: <%= storeNameCapitalized %>State = {
        data: Object.assign({}, state.data, { [action.payload]: action.payload }),
      };
      return Object.assign({}, state, newState);
    }

    default: {
      return state;
    }
  }
};

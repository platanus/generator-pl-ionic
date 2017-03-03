import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { <%= storeNameCapitalized %> } from './';

@Injectable()
export class <%= storeNameCapitalized %>Actions {
  public static EXAMPLE_ACTION: string = '[<%= storeName %>] Example Action';
  public static EXAMPLE_ACTION_SUCCESS: string = '[<%= storeName %>] Example Action Success';
  public static EXAMPLE_ACTION_FAILURE: string = '[<%= storeName %>] Example Action Failure';

  public exampleAction(payload: any): Action {
    return {
      type:  <%= storeNameCapitalized %>Actions.EXAMPLE_ACTION,
      payload: payload,
    };
  }

  public exampleActionSuccess(payload: any): Action {
    return {
      type:  <%= storeNameCapitalized %>Actions.EXAMPLE_ACTION_SUCCESS,
      payload: payload,
    };
  }

  public exampleActionFailure(payload: any): Action {
    return {
      type:  <%= storeNameCapitalized %>Actions.EXAMPLE_ACTION_FAILURE,
      payload: payload,
    };
  }
}

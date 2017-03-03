import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { <%= storeNameCapitalized %>Actions } from './<%= storeName %>.actions';

@Injectable()
export class <%= storeNameCapitalized %>Effects {
  @Effect() private exampleEffect$: Observable<Action>;
  @Effect() private exampleEffectSuccess$: Observable<Action>;
  @Effect() private exampleEffectFailure$: Observable<Action>;
  constructor(
    private actions$: Actions,
    private <%= storeName %>Actions: <%= storeNameCapitalized %>Actions,
    private store: Store<AppState>,
  ) {
    this.exampleEffect$ = this.actions$
      .ofType(<%= storeNameCapitalized %>Actions.EXAMPLE_ACTION)
      .switchMap((action) => {
        return Observable.range(1, 5) // Replace with call to async service
          .map((response: any) => this.<%= storeName %>Actions.submitReportSuccess(response))
          .catch(err => Observable.of(this.<%= storeName %>Actions.submitReportFailure(err)));
      });
}

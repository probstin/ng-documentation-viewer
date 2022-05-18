import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsBusService {
  private _subject$ = new Subject();

  constructor() { }

  emit(event: EventData) {
    this._subject$.next(event);
  }

  on(eventType: EventType, action: any): Subscription {
    return this._subject$
      .pipe(
        filter((e: any) => e.type === eventType),
        map((e: any) => e.value)
      )
      .subscribe(action);
  }

}

export class EventData {
  constructor(public type: EventType, public value: any) { }
}

export enum EventType {
  DOC_SELECTED
}

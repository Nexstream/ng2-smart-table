import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Column } from '../../../lib/data-set/column';

export class DefaultFilter implements Filter, OnDestroy {

  delay: number = 300;
  changesSubscription: Subscription;
  @Input() query: any;
  @Input() inputClass: string;
  @Input() column: Column;
  @Output() filter = new EventEmitter<string>();
  @Output() customFilter = new EventEmitter<any>();

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
  }

  setFilter() {
    this.filter.emit(this.query);
  }

  setCustomFilter() {
    this.customFilter.emit(this.query);
  }
}

export interface Filter {

  delay?: number;
  changesSubscription?: Subscription;
  query: string;
  inputClass: string;
  column: Column;
  filter: EventEmitter<string>;
  customFilter: EventEmitter<string>;
}

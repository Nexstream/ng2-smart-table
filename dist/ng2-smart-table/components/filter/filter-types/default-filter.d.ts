import { EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Column } from '../../../lib/data-set/column';
export declare class DefaultFilter implements Filter, OnDestroy {
    delay: number;
    changesSubscription: Subscription;
    query: any;
    inputClass: string;
    column: Column;
    filter: EventEmitter<string>;
    customFilter: EventEmitter<any>;
    ngOnDestroy(): void;
    setFilter(): void;
    setCustomFilter(): void;
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

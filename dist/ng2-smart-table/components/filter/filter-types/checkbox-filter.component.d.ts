import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
export declare class CheckboxFilterComponent extends DefaultFilter implements OnInit {
    filterActive: boolean;
    inputControl: FormControl;
    constructor();
    ngOnInit(): void;
    resetFilter(event: any): void;
}

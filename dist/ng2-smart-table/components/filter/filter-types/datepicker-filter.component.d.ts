import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
export declare class DatepickerFilterComponent extends DefaultFilter implements OnInit {
    private fb;
    dateForm: FormGroup;
    filterActive: boolean;
    inputControl: FormControl;
    private dateModel;
    query: any[];
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    clearFilter(): void;
}

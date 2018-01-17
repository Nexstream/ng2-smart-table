import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyDrpOptions } from 'mydaterangepicker';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
export declare class DateRangeFilterComponent extends DefaultFilter implements OnInit {
    private formBuilder;
    dateRange: FormGroup;
    rangePickerModel: Object;
    myDateRangePickerOptions: IMyDrpOptions;
    private searchDate;
    query: any[];
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
}

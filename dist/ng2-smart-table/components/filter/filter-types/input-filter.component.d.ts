import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
export declare class InputFilterComponent extends DefaultFilter implements OnInit {
    inputControl: FormControl;
    constructor();
    ngOnInit(): void;
}

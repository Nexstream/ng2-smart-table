import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IMyDateRangeModel, IMyDateRange, IMyDrpOptions } from 'mydaterangepicker'

import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';


@Component({
  selector: 'daterange-filter',
  template: `
    <form [formGroup]="dateRange" novalidate>
      <my-date-range-picker name="mydaterange"
                            [options]="myDateRangePickerOptions"
                            [ngClass]="inputClass"
        formControlName="myDateRange"></my-date-range-picker>
    </form>
  `,
  styles: [`
    form {
      height: 28px;
    }
  `]
})
export class DateRangeFilterComponent extends DefaultFilter implements OnInit {

  public dateRange: FormGroup;
  public rangePickerModel: Object;
  public myDateRangePickerOptions: IMyDrpOptions = {
    height: '26px',
    width: '185px',
    showClearBtn: false,
    showApplyBtn: false,
    selectionTxtFontSize: '.875em',
  };
  private searchDate: any;

  get query(): any[] {
    return this.searchDate;
  }

  @Input()
  set query(value: any[]) {

    if (!Array.isArray(value)) { value = [] }
    else {

      let date: IMyDateRange = {
        beginDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate()
        },
        endDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        }
      };

      value.forEach(e => {
        let search = e.search || new Date();

        if (e.field === 'fromDate') {
          date.beginDate = {
            year: new Date(search).getFullYear(),
            month: new Date(search).getMonth() + 1,
            day: new Date(search).getDate()
          }
        }
        if (e.field === 'toDate') {
          date.beginDate = {
            year: new Date(search).getFullYear(),
            month: new Date(search).getMonth() + 1,
            day: new Date(search).getDate()
          }
        }
      });
      this.rangePickerModel = date;
    }

    this.searchDate = value;
  }

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.dateRange = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: [this.rangePickerModel, Validators.required]
    });
    this.dateRange.controls['myDateRange'].valueChanges
      .distinctUntilChanged()
      .debounceTime(this.delay)
      // .skip(1)
      .map((data: IMyDateRangeModel) => {
        let filters = [{
          field: 'fromDate',
          search: '',
        }, {
          field: 'toDate',
          search: '',
        }];

        if (data) {
          let fromDate = data.formatted.split(' - ')[0];
          let toDate = data.formatted.split(' - ')[1];
          filters.forEach(filter => {
            if (filter.field == 'fromDate') { filter.search = fromDate };
            if (filter.field == 'toDate') { filter.search = toDate };
          })
        }
        return filters;
      })
      .subscribe((filters) => {
        this.query = filters
        this.setCustomFilter();
      });
  }
}

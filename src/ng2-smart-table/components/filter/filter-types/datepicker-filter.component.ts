import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';


@Component({
  selector: 'datepicker-filter',
  template: `
    <form [formGroup]="dateForm" novalidate>
      <div class="input-group">
      <span class="input-group-btn" (click)="d.toggle()">
        <i style="font-size: 23px; margin-right: 5px; cursor:pointer" class="fa fa-calendar"></i>
      </span>
        <input
          type="text"
          class="form-control"
          placeholder="yyyy-mm-dd"
          ngbDatepicker
          #d="ngbDatepicker"
          formControlName="date"
        />
      </div>
    </form>
  `,
  styles: [`

  `]
})
export class DatepickerFilterComponent extends DefaultFilter implements OnInit {

  public dateForm: FormGroup;
  filterActive: boolean = false;
  inputControl = new FormControl();

  private dateModel: any;

  get query(): any[] {
    return this.dateModel;
  }

  @Input()
  set query(value: any[]) {
    this.dateModel = value
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.dateForm = this.fb.group({
      date: ['', Validators.required]
    });

    this.dateForm.controls['date'].valueChanges
      .distinctUntilChanged()
      .debounceTime(this.delay)
      .map((a) => {
        let filters = [{
          field: 'date',
          search: new Date(a.year,a.month-1, a.day).getTime()
        }];

        return filters;
      })
      .subscribe((filters) => {
        this.query = filters;
        this.setCustomFilter();
      });
  }
}

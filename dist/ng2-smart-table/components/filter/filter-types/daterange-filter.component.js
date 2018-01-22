var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
var DateRangeFilterComponent = (function (_super) {
    __extends(DateRangeFilterComponent, _super);
    function DateRangeFilterComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.myDateRangePickerOptions = {
            height: '26px',
            width: '185px',
            showClearBtn: false,
            showApplyBtn: false,
            selectionTxtFontSize: '.875em',
        };
        return _this;
    }
    Object.defineProperty(DateRangeFilterComponent.prototype, "query", {
        get: function () {
            return this.searchDate;
        },
        set: function (value) {
            var _this = this;
            if (!Array.isArray(value)) {
                value = [];
            }
            else {
                var date_1 = {
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
                value.forEach(function (e) {
                    var search = e.search || new Date();
                    if (e.field === _this.startKey) {
                        date_1.beginDate = {
                            year: new Date(search).getFullYear(),
                            month: new Date(search).getMonth() + 1,
                            day: new Date(search).getDate()
                        };
                    }
                    if (e.field === _this.endKey) {
                        date_1.beginDate = {
                            year: new Date(search).getFullYear(),
                            month: new Date(search).getMonth() + 1,
                            day: new Date(search).getDate()
                        };
                    }
                });
                this.rangePickerModel = date_1;
            }
            this.searchDate = value;
        },
        enumerable: true,
        configurable: true
    });
    DateRangeFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var columnObj = Object.assign({}, this.column);
        this.startKey = columnObj.filter.startKey || 'fromDate';
        this.endKey = columnObj.filter.endKey || 'toDate';
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
            .map(function (data) {
            var filters = [{
                    field: _this.startKey,
                    search: '',
                }, {
                    field: _this.endKey,
                    search: '',
                }];
            if (data) {
                var fromDate_1 = data.formatted.split(' - ')[0];
                var toDate_1 = data.formatted.split(' - ')[1];
                filters.forEach(function (filter) {
                    if (filter.field == _this.startKey) {
                        filter.search = fromDate_1;
                    }
                    if (filter.field == _this.endKey) {
                        filter.search = toDate_1;
                    }
                });
            }
            return filters;
        })
            .subscribe(function (filters) {
            _this.query = filters;
            _this.setCustomFilter();
        });
    };
    return DateRangeFilterComponent;
}(DefaultFilter));
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DateRangeFilterComponent.prototype, "query", null);
DateRangeFilterComponent = __decorate([
    Component({
        selector: 'daterange-filter',
        template: "\n    <form [formGroup]=\"dateRange\" novalidate>\n      <my-date-range-picker name=\"mydaterange\"\n                            [options]=\"myDateRangePickerOptions\"\n                            [ngClass]=\"inputClass\"\n                            formControlName=\"myDateRange\"></my-date-range-picker>\n    </form>\n  ",
        styles: ["\n    form {\n      height: 28px;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [FormBuilder])
], DateRangeFilterComponent);
export { DateRangeFilterComponent };
//# sourceMappingURL=daterange-filter.component.js.map
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
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
var DatepickerFilterComponent = (function (_super) {
    __extends(DatepickerFilterComponent, _super);
    function DatepickerFilterComponent(fb) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.filterActive = false;
        _this.inputControl = new FormControl();
        return _this;
    }
    Object.defineProperty(DatepickerFilterComponent.prototype, "query", {
        get: function () {
            return this.dateModel;
        },
        set: function (value) {
            this.dateModel = value;
        },
        enumerable: true,
        configurable: true
    });
    DatepickerFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dateForm = this.fb.group({
            date: ['', Validators.required]
        });
        this.dateForm.controls['date'].valueChanges
            .distinctUntilChanged()
            .debounceTime(this.delay)
            .map(function (a) {
            var filters = [{
                    field: _this.column.id,
                    search: new Date(a.year, a.month - 1, a.day).getTime() || ''
                }];
            return filters;
        })
            .subscribe(function (filters) {
            _this.query = filters;
            _this.setCustomFilter();
        });
    };
    DatepickerFilterComponent.prototype.clearFilter = function () {
        if (!this.query) {
            return;
        }
        this.dateForm.controls['date'].setValue('');
    };
    return DatepickerFilterComponent;
}(DefaultFilter));
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DatepickerFilterComponent.prototype, "query", null);
DatepickerFilterComponent = __decorate([
    Component({
        selector: 'datepicker-filter',
        template: "\n    <form [formGroup]=\"dateForm\" novalidate>\n      <div class=\"input-group\">\n      <span class=\"input-group-btn\" (click)=\"d.toggle()\">\n        <i style=\"font-size: 23px; margin-right: 5px; cursor:pointer\" class=\"fa fa-calendar\"></i>\n      </span>\n        <div class=\"form-control date-input\">\n          <input\n            type=\"text\"\n            class=\"input\"\n            placeholder=\"yyyy-mm-dd\"\n            ngbDatepicker\n            #d=\"ngbDatepicker\"\n            formControlName=\"date\"\n            [readonly]=\"true\"\n          />\n          <i class=\"fa fa-times\" (click)=\"clearFilter()\"></i>\n        </div>\n      </div>\n    </form>\n  ",
        styles: ["\n    .date-input {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      flex-direction: row;\n    }\n\n    .input {\n      border: none;\n      padding: 0 !important;\n    }\n\n    .fa-calendar {\n      font-size: 25px;\n      cursor: pointer;\n      margin-right: 5px;\n    }\n\n    .fa-times {\n      font-size: 15px;\n      color: lightgrey;\n      cursor: pointer\n    }\n  "]
    }),
    __metadata("design:paramtypes", [FormBuilder])
], DatepickerFilterComponent);
export { DatepickerFilterComponent };
//# sourceMappingURL=datepicker-filter.component.js.map
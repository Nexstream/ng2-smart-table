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
import { Headers } from '@angular/http';
import { ServerDataSource } from './server/server.data-source';
import 'rxjs/add/operator/toPromise';
var CustomServerDataSource = (function (_super) {
    __extends(CustomServerDataSource, _super);
    function CustomServerDataSource(http, conf, activateRoute, router, hasInitFilter, isPost) {
        if (isPost === void 0) { isPost = true; }
        var _this = _super.call(this, http, conf) || this;
        _this.http = http;
        _this.activateRoute = activateRoute;
        _this.router = router;
        _this.hasInitFilter = hasInitFilter;
        _this.requestOptions = {
            'totalRowPerPage': 10,
            'pageNo': _this.pagingConf['page'] || 1,
            'filterSearch': [],
        };
        _this.pagingConf.page = 1;
        _this.conf.pagerPageKey = 'pageNo';
        _this.conf.pagerLimitKey = 'totalRowPerPage';
        _this.isPost = isPost;
        _this.addApiKey();
        _this.setPaging(1, 1, false);
        _this.activateRoute.queryParams.subscribe(function (e) {
            _this.requestOptions.pageNo = 1;
            if (e['page']) {
                _this.requestOptions.pageNo = +e['page'];
            }
            _this.setPaging(_this.requestOptions.pageNo, 1, false);
        });
        return _this;
    }
    CustomServerDataSource.prototype.requestElements = function () {
        var _this = this;
        this.requestOptions.pageNo = this.getPaging().page;
        this.requestOptions.filterSearch = [];
        var currentPage = null;
        if (this.requestOptions.pageNo > 1) {
            currentPage = this.requestOptions.pageNo;
        }
        this.router.navigate([], {
            queryParams: { page: currentPage },
            relativeTo: this.activateRoute
        });
        this.filterConf.filters.forEach(function (element) {
            var obj = {};
            obj['searchVar'] = element.field;
            obj['searchKeyword'] = element.search;
            if (_this.hasInitFilter) {
                if (obj['searchVar'] === _this.hasInitFilter['searchVar'] && !obj['searchKeyword']) {
                    _this.requestOptions.filterSearch.push(_this.hasInitFilter);
                }
            }
            if (element.search !== '' && element.search !== null) {
                _this.requestOptions.filterSearch.push(obj);
            }
        });
        if (this.isPost) {
            return this.http.post(this.conf.endPoint, this.requestOptions, { headers: this.headers });
        }
        else {
            return this.http.get(this.conf.endPoint, { headers: this.headers });
        }
    };
    CustomServerDataSource.prototype.extractDataFromResponse = function (res) {
        return res.json().arrayList || res.json().dataResp;
    };
    CustomServerDataSource.prototype.extractTotalFromResponse = function (res) {
        return res.json().totalPage;
    };
    CustomServerDataSource.prototype.addApiKey = function () {
        this.headers = new Headers();
        this.headers.append('apiKey', localStorage.getItem('apiKey'));
    };
    return CustomServerDataSource;
}(ServerDataSource));
export { CustomServerDataSource };
//# sourceMappingURL=custom-server.data-source.js.map
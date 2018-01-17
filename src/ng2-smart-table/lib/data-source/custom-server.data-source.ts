import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerDataSource } from './server/server.data-source';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

export class CustomServerDataSource extends ServerDataSource {

  headers: Headers;
  isPost: boolean;
  private requestOptions: any = {
    'totalRowPerPage': 10,
    'pageNo': this.pagingConf['page'] || 1,
    'filterSearch': [],
  };

  constructor(protected http: Http,
              conf: any,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private hasInitFilter?: any,
              isPost = true) {
    super(http, conf);

    this.pagingConf.page = 1;
    this.conf.pagerPageKey = 'pageNo';
    this.conf.pagerLimitKey = 'totalRowPerPage';
    this.isPost = isPost;
    this.addApiKey();
    this.setPaging(1, 1, false);


    this.activateRoute.queryParams.subscribe((e) => {
      this.requestOptions.pageNo = 1;
      if (e['page']) {
        this.requestOptions.pageNo = +e['page'];
      }
      this.setPaging(this.requestOptions.pageNo, 1, false);
    })
  }

  protected requestElements(): Observable<any> {
    this.requestOptions.pageNo = this.getPaging().page
    this.requestOptions.filterSearch = [];
    let currentPage = null;
    if (this.requestOptions.pageNo > 1) {
      currentPage = this.requestOptions.pageNo
    }
    this.router.navigate([], {
      queryParams: {page: currentPage},
      relativeTo: this.activateRoute
    });

    this.filterConf.filters.forEach((element: any) => {
      const obj: any = {};
      obj['searchVar'] = element.field;
      obj['searchKeyword'] = element.search;

      if (this.hasInitFilter) {
        if (obj['searchVar'] === this.hasInitFilter['searchVar'] && !obj['searchKeyword']) {
          this.requestOptions.filterSearch.push(this.hasInitFilter);
        }
      }

      if (element.search !== '' && element.search !== null) {
        this.requestOptions.filterSearch.push(obj);
      }
    });

    if (this.isPost) {
      return this.http.post(this.conf.endPoint, this.requestOptions, {headers: this.headers});
    } else {
      return this.http.get(this.conf.endPoint, {headers: this.headers});
    }
  }

  protected extractDataFromResponse(res: any) {
    return res.json().arrayList || res.json().dataResp;
  }

  protected extractTotalFromResponse(res: any): number {
    return res.json().totalPage;
  }

  protected addApiKey() {
    this.headers = new Headers();
    this.headers.append('apiKey', localStorage.getItem('apiKey'));
  }

}

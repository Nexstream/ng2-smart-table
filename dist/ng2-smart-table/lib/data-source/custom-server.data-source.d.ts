import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerDataSource } from './server/server.data-source';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
export declare class CustomServerDataSource extends ServerDataSource {
    protected http: Http;
    private activateRoute;
    private router;
    private hasInitFilter;
    headers: Headers;
    isPost: boolean;
    private requestOptions;
    constructor(http: Http, conf: any, activateRoute: ActivatedRoute, router: Router, hasInitFilter?: any, isPost?: boolean);
    protected requestElements(): Observable<any>;
    protected extractDataFromResponse(res: any): any;
    protected extractTotalFromResponse(res: any): number;
    protected addApiKey(): void;
}

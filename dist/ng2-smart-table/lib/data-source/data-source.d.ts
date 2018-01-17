import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
export declare abstract class DataSource {
    protected onChangedSource: Subject<any>;
    protected onAddedSource: Subject<any>;
    protected onUpdatedSource: Subject<any>;
    protected onRemovedSource: Subject<any>;
    onRequestSource: Subject<any>;
    abstract getAll(): Promise<any>;
    abstract getElements(): Promise<any>;
    abstract getSort(): any;
    abstract getFilter(): any;
    abstract getPaging(): any;
    abstract count(): number;
    refresh(): void;
    load(data: Array<any>): Promise<any>;
    onChanged(): Observable<any>;
    onAdded(): Observable<any>;
    onUpdated(): Observable<any>;
    onRemoved(): Observable<any>;
    onRequestData(): Observable<any>;
    prepend(element: any): Promise<any>;
    append(element: any): Promise<any>;
    add(element: any): Promise<any>;
    remove(element: any): Promise<any>;
    update(element: any, values: any): Promise<any>;
    empty(): Promise<any>;
    setSort(conf: Array<any>, doEmit?: boolean): void;
    setFilter(conf: Array<any>, andOperator?: boolean, doEmit?: boolean): void;
    addFilter(fieldConf: {}, andOperator?: boolean, doEmit?: boolean): void;
    setPaging(page: number, perPage: number, doEmit?: boolean): void;
    setPage(page: number, doEmit?: boolean): void;
    protected emitOnRemoved(element: any): void;
    protected emitOnUpdated(element: any): void;
    protected emitOnAdded(element: any): void;
    protected emitOnChanged(action: string): void;
}

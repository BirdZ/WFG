import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
export interface URLParameter { key: string; value: any; }

@Injectable()
export class HTTPService {

    constructor(private httpCall: HttpClient) { }

    /* ============ CRUD ============ */

    /**
     * Construct a GET request
     */
    public get<T>(url: string, parameters?: URLParameter[]): Observable<T> {
        console.log('GET', url);
        // const headers = new HttpHeaders({ 'Content-Type': 'application/pjson' });
        let httpParams: HttpParams = new HttpParams();
        // Add query string params, if any
        if (parameters && parameters.length) {
            parameters.forEach((element: URLParameter) => {
                httpParams = httpParams.append(element.key, element.value);
            });
        }
        return this.httpCall.get<T>(url, { observe: 'response', params: httpParams })
            .pipe(map((res: HttpResponse<T>) => res.body));
    }

    /**
     * Construct a POST request which interprets the body as JSON and returns the full response.
     */
    public post<T>(url: string, body: any, parameters?: URLParameter[], header?: any): Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (header) { headers = headers.append(header.key, header.value); }
        let httpParams: HttpParams = new HttpParams();
        if (parameters && parameters.length) {
            parameters.forEach((element: URLParameter) => {
                httpParams = httpParams.append(element.key, element.value);
            });
        }
        const bodyJSON = JSON.stringify(this.removeEmpties(body));
        return this.httpCall.post<T>(url, bodyJSON, { headers, observe: 'response', responseType: 'json', params: httpParams })
            .pipe(map((res: HttpResponse<T>) => res.body));
    }

    /**
     * Construct a PUT request
     */
    public put<T>(url: string, body: any, parameters?: URLParameter[]): Observable<T> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let httpParams: HttpParams = new HttpParams();
        if (parameters && parameters.length) {
            parameters.forEach((element: URLParameter) => {
                httpParams = httpParams.append(element.key, element.value);
            });
        }
        const bodyJSON = JSON.stringify(this.removeEmpties(body));
        return this.httpCall.put<T>(url, bodyJSON, { headers, observe: 'response', responseType: 'json', params: httpParams })
            .pipe(map((res: HttpResponse<T>) => res.body));
    }

    /**
     * Construct a DELETE request
     */
    public delete<T>(url: string, parameters?: URLParameter[]): Observable<T> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpCall.delete<T>(url, { headers, observe: 'response' }).pipe(map((res: HttpResponse<T>) => res.body));
    }

    /* ============ UTILS ============ */

    /**
     * Construct a post file
     */
    public postFile(url: string, blob: Blob, parameters?: URLParameter[]): Observable<HttpEvent<unknown>> {
        let httpParams: HttpParams = new HttpParams();
        const body = new FormData(); body.append('file', blob);
        if (parameters && parameters.length) {
            parameters.forEach((element: URLParameter) => {
                httpParams = httpParams.append(element.key, element.value);
            });
        }
        const req = new HttpRequest('POST', url, body, { params: httpParams, responseType: 'json', reportProgress: true });
        return this.httpCall.request(req);
    }

    public toParameters(obj: Object): URLParameter[] {
        const params: URLParameter[] = [];
        Object.keys(obj).forEach((key: string) => {
            params.push({ key, value: obj[key] });
        });
        return params;
    }

    private removeEmpties(body: any): any {
        if (body) {
            Object.keys(body).forEach((key: string) => {
                if (!body[key] && body[key] !== 0 && body[key] !== false) {
                    try {
                        delete body[key];
                    } catch (e) {
                    }
                }
            });
        }
        return body;
    }

}

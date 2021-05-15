import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from "rxjs/operators";
@Injectable()
export class ApiService {
    basePath: string;

    constructor(private http: HttpClient) {
        this.basePath = environment.apiURL;
    }
    getHeader() {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', 'bearer ');

        return headers;
    }
    getImageHeader() {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'bearer ');
        headers = headers.set('Accept', "multipart/form-data");

        return headers;
    }
    // Add new
    adduser(formadata) {
        let headers = this.getImageHeader();
        return this.http.request('post', Location.joinWithSlash(`${this.basePath}`, `api/user`), {
            observe: 'response',
            withCredentials: true,
            headers: headers,
            body: formadata
        })
        .pipe(map(response => {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        }));
    }
    updateuser(data: any, id: any) {
        let headers = this.getHeader();
        return this.http.request('put', Location.joinWithSlash(`${this.basePath}`, `api/user/${id}`), {
            observe: 'response',
            withCredentials: true,
            headers,
            body: data
        })
        .pipe(map(response => {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        }));
    }
    getUsers() {
        let headers = this.getHeader();
        return this.http.request('get', Location.joinWithSlash(`${this.basePath}`, `api/user`), {
            observe: 'response',
            withCredentials: true,
            headers,
        })
        .pipe(map(response => {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        }));
    }
    // Delete
    deletUser(id: any){
        let headers = this.getHeader();
        return this.http.request('get', Location.joinWithSlash(`${this.basePath}`, `api/user-delete/${id}`), {
            observe: 'response',
            headers,
        })
        .pipe(map(response => {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        }));
    }
    // Get
    getUser(id: any){
        let headers = this.getHeader();
        return this.http.request('get', Location.joinWithSlash(`${this.basePath}`, `api/user/${id}`), {
            observe: 'response',
            headers,
        })
        .pipe(map(response => {
            switch (response.status) {
                case 200: {
                    return response.body;
                }
            }
        }));
    }
}
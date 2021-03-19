import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuI } from '../interfaces/menu';
@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {}

    getMenuOptions() {
        return this.http.get<MenuI[]>('/assets/data/menu.json');
    }
}
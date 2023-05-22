import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}


  public categories(searchText) {
    return this._http.get(`${baseUrl}/category/` + '?searchText=' + searchText);
  }



  public addCategory(category) {
    return this._http.post(`${baseUrl}/category/`, category);
  }


  public deleteCategory(categoryId:number) {
    return this._http.delete(`${baseUrl}/category/`+categoryId,{});
  }
}

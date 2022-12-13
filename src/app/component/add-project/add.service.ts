import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdd } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient) { }


  postAddData(data: any) {
    return this.http.post('http://localhost:3000/project', data)
  }

  getAddedData() {
    return this.http.get<IAdd>('http://localhost:3000/project')
  }

  edit(data: any, id: number) {
    return this.http.put('http://localhost:3000/project' + '/' + id, data)
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/project' + '/' + id)
  }
}

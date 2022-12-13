import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdd } from './component/add-project/interface';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient) { }


  postAddData(data: IAdd) {
    return this.http.post<IAdd>('http://localhost:3000/project', data)
  }

  getAddedData(): Observable<IAdd> {
    return this.http.get<IAdd>('http://localhost:3000/project')
  }

  edit(data: IAdd, id: number) {
    return this.http.put('http://localhost:3000/project' + '/' + id, data)
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/project' + '/' + id)
  }
}

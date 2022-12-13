import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprojectComponent } from './component/myproject/myproject.component';

const routes: Routes = [
  {
    path: 'myproject',
    component: MyprojectComponent
  },
  {
    path: '',
    redirectTo: 'myproject',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'myproject',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

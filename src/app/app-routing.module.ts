import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgHighlightModule } from 'ngx-text-highlight';


const routes: Routes = [
  {path: '', component:LoginComponent },
  {path: 'Home', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgHighlightModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

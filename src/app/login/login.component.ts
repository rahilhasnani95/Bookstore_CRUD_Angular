import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { User } from './User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model = new User("", "");

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit()
  {
    if(this.model.username == 'admin' && this.model.password == 'admin')
    {
      this.router.navigateByUrl('/Home');
    }
    else {
      alert("Invalid User Name or Password");
      this.router.navigate(['/']);
    }
  }

}

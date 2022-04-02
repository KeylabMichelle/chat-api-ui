import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showPassword: boolean = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router    ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      terminosCondiciones: ['', [Validators.requiredTrue]]
    }, {
      validators: this.matchPasswords.bind(this)
    });
  }

  ngOnInit(): void {
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendData() {
    
    if(this.form.valid) {
      const {name, username, email, password} = this.form.getRawValue();
      this.userService.signup({name, username, email, password}).subscribe( {
        complete:()=>{
          this.router.navigate(['/login']);
        },
        error:(err)=> {
          console.log(err)
        }
        
      })
      console.log('Enviar datos', password, confirm);
    } else {
      console.log('Error, faltan datos', this.form);
    }
  }

  matchPasswords() {
    if(!this.form) return;
    const { password, confirm } = this.form.getRawValue();
    if(password === confirm) {
      return null;
    } else {
      return { passwordMismatch: true }
    }
  }


}

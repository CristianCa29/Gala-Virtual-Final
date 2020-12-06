import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/auth.service';
import { UserProfileService } from '../../../core/services/user.service';
import { getFirebaseBackend } from '../../../authUtils';
import { getCloudFirestore } from '../../../core/firebaseCode/cloudFirestore';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

/**
 * Signup component
 */
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
              private userService: UserProfileService) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
    });
    // this.signupForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    //   apellido: ['', Validators.required],
    //   username: ['', Validators.required],
    // });
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.register(this.f.email.value, '123456').then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            console.log(this.authenticationService.currentUser());
            console.log(getFirebaseBackend().uidUser());
            localStorage.setItem('idUser', `${getFirebaseBackend().uidUser()}`);
            localStorage.setItem('sesion', 'true');

            const idDoc = getFirebaseBackend().uidUser();
            // getCloudFirestore().registrarDatosUsuario(this.f.username.value,
            //                                           this.f.apellido.value,
            //                                           this.f.email.value,
            //                                           this.f.password.value,
            //                                           idDoc);
            getCloudFirestore().registrarDatosUsuario(this.f.username.value,
                                                      this.f.apellido.value,
                                                      this.f.email.value,
                                                      '123456',
                                                      idDoc);
            this.router.navigate(['/']);
          }
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/login']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }
}

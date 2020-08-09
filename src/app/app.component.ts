import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mailer-app';
  toMailString: string;
  password: string;
  fromMailId: string;
  subjectOfMail: string;
  mailContent: string;
  emailForm: FormGroup;
  constructor(private http: HttpClient, formBuilder: FormBuilder) {
    this.emailForm = formBuilder.group({
      fromEmail: ['', Validators.compose(
        [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      recipientMailId: ['', Validators.required],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }
  onSubmit(form: FormGroup): void {
    if (!form.invalid) {
      const mailList = form.controls.recipientMailId.value.split(',');
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      // headers.append('Access-Control-Allow-Origin', 'allowedOrigin');

      this.http.post('http://localhost:3000/api/sendMail', {
        fromMail: form.controls.fromEmail.value,
        password: form.controls.password.value,
        toMailList: mailList.map(mail => mail.trim()),
        subject: form.controls.subject.value,
        content: form.controls.content.value
      }, { headers }).subscribe((result: ResponseModel) => {
        alert(result.message);
      },
        error => {
          alert(error && error.error ? error.error.message : 'Service error');
        });
    }
    else {
      alert('Error in data entered');
    }
  }
}
export interface ResponseModel {
  status: number;
  data: any[];
  message: string;
}

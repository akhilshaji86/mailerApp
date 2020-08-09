import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  onSubmit(form: NgForm): void {
    if (!form.invalid) {
      debugger
      const mailList = this.toMailString.split(',');
      this.http.post('api/sendMail', {
        fromMail: this.fromMailId,
        toMailList: mailList,
        subject: this.subjectOfMail,
        content: this.mailContent
      });
    }
  }
}

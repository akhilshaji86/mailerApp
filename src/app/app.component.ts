import { NgForm } from '@angular/forms';
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
  fromMailId: string;
  subjectOfMail: any;
  mailContent: any;
  constructor(private http: HttpClient) {

  }
  sendMail(form: NgForm): void {
    if (!form.invalid) {
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

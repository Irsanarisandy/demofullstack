import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from '../../../_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') private messageForm: NgForm;
  @Input() public username: string;
  public messageContent: string;
  public loading = false;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void { }

  sendMessage(): void {
    this.loading = true;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    }).finally(() => this.loading = false);
  }
}

import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from '../../../_domain/message';
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
  @Input() public messages: Message[] = [];
  public messageContent: string;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { }

  sendMessage(): void {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
    });
  }
}

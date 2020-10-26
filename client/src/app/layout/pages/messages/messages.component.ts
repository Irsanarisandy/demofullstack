import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Message } from '../../../_domain/message';
import { MessageParams } from '../../../_domain/message-params';
import { Pagination } from '../../../_domain/pagination';
import { MessageService } from '../../../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Message>;
  public messages: Message[] = [];
  public pagination: Pagination;
  public messageParams: MessageParams;
  public loading = false;

  constructor(private messageService: MessageService) {
    this.messageParams = this.messageService.getMessageParams();
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getMessages(this.messageParams).subscribe(response => {
      this.messages = response.result;
      this.dataSource = new MatTableDataSource(this.messages);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  deleteMessage(id: number): void {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id, 1));
      this.dataSource = new MatTableDataSource(this.messages);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  pageChanged(event: any): void {
    this.messageParams.pageNumber = event.pageIndex + 1;
    this.messageService.setMessageParams(this.messageParams);
    this.loadMessages();
  }
}

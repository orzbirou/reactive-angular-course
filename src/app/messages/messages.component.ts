import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: false
})
export class MessagesComponent implements OnInit {

  errors$: Observable<string[]>;

  showMessage = false;


  constructor(public messageService: MessagesService) {

  }

  ngOnInit() {
    this.errors$ = this.messageService.error$.pipe(
    tap(() => this.showMessage = true)
  )
  }


  onClose() {
    this.showMessage = false;
  }

}

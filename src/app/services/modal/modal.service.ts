import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalTitle: string = '';
  modalVisibilityChange: Subject<boolean> = new Subject<boolean>();
  closeModal: Subject<boolean> = new Subject<boolean>();
  constructor() {}

  modalShow(action: boolean = false, title: string = '') {
    this.modalTitle = title;
    this.modalVisibilityChange.next(action);
  }
}

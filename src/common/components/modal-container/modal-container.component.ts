import {Component, inject} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal-container',
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})
export class ModalContainerComponent {
  protected service = inject(ModalService)
}

/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../../constants/elements.js';
import TYPES from '../../constants/types.js';

class ModalComponent {
  constructor(emitter) {
    this.emiitter = emitter;

    this.modal = document.getElementById(ELEMENTS.MODAL);

    this.initialize();
  }

  initialize() {
    this.modalButton = this.modal.querySelector('.modal__button');
    this.modalShadow = this.modal.querySelector('.modal__shadow');
    this.modalWindow = this.modal.querySelector('.modal__content');

    this.modalButton.addEventListener('click', () => {
      this.toggleModal();
    });

    this.closeButton = this.modalWindow.querySelector('.close');
    this.closeButton.addEventListener('click', () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    this.modalWindow.classList.toggle('show');
    this.modalShadow.classList.toggle('show');
  }
}

decorate(injectable(), ModalComponent);
decorate(inject(TYPES.EventEmitter), ModalComponent, 0);

export default ModalComponent;

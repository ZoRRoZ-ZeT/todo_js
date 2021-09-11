import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../constant/elements';
import TYPES from '../constant/types';
// eslint-disable-next-line no-unused-vars
import EventEmitter from '../emitter/emitter';
import ItemComponent from './list-item/item.component';

export default class TaskListComponent {
  /**
   *
   * @param {EventEmitter} emitter
   */
  constructor(emitter) {
    this.list = document.getElementById(ELEMENTS.List);
    this.emitter = emitter;

    this.emitter.subscribe('LIST_CHANGED', (tasks) => {
      this.render(tasks);
    });
  }

  /**
   *
   * @param {Array.<id,value,isChecked>} tasks
   */
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task) => {
      const item = new ItemComponent(this.emitter, task);
      this.list.appendChild(item.getHtmlComponent());
    });
  }
}

decorate(injectable(), TaskListComponent);
decorate(inject(TYPES.EventEmitter), TaskListComponent, 0);

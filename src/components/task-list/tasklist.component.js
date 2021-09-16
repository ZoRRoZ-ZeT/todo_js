import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../../constants/elements';
import TYPES from '../../constants/types';
// eslint-disable-next-line no-unused-vars
import ItemComponent from './list-item/item.component';

class TaskListComponent {
  constructor(emitter) {
    this.list = document.getElementById(ELEMENTS.LIST);
    this.emitter = emitter;

    this.emitter.subscribe('RENDER_LIST', (tasks) => {
      this.render(tasks);
    });
  }

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

export default TaskListComponent;

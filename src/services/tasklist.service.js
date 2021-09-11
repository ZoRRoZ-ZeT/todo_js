import { decorate, inject, injectable } from 'inversify';
import TYPES from '../constant/types';
// eslint-disable-next-line no-unused-vars
import EventEmitter from '../emitter/emitter';

export default class TaskListService {
  /**
   *
   * @param {EventEmitter} emitter
   */
  constructor(emitter) {
    /** @type {Array.<{id,value,isChecked}} */
    this.tasks = [];
    this.emitter = emitter;
    this.counterId = 0;
    this.filter = null;

    this.emitter.subscribe('ITEM_CHANGED', (task) => {
      this.updateTask(task);
    });

    this.emitter.subscribe('ITEM_DELETED', (id) => {
      this.deleteTask(id);
    });
  }

  addTask(value) {
    const newTask = {
      id: this.counterId,
      value,
      isChecked: false,
    };

    this.tasks.push(newTask);
    console.log(newTask);

    this.counterId += 1;

    this.emitter.emit('LIST_CHANGED', this.getTasks());
  }

  getTask(id) {
    return this.tasks.find((x) => x.id === id);
  }

  getTasks() {
    if (this.filter === null) {
      return this.tasks.slice();
    }
    return this.tasks.filter((x) => x.isChecked === this.filter);
  }

  applyFilter(filter) {
    this.filter = filter;
    this.emitter.emit('LIST_CHANGED', this.getTasks());
  }

  updateTask(task) {
    const oldTask = this.getTask(task.id);
    oldTask.value = task.value;
    oldTask.isChecked = task.isChecked;

    console.log(this.tasks);
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((x) => x.id === id);
    this.tasks.splice(index, 1);
    this.emitter.emit('LIST_CHANGED', this.getTasks());
  }
}

decorate(injectable(), TaskListService);
decorate(inject(TYPES.EventEmitter), TaskListService, 0);
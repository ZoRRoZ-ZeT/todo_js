import { decorate, inject, injectable } from 'inversify';
import TYPES from '../constant/types';
// eslint-disable-next-line no-unused-vars

class TaskListService {
  constructor(emitter) {
    this.tasks = [];
    this.emitter = emitter;
    this.counterId = 0;
    this.filter = null;

    this.emitter.subscribe('CHANGE_ITEM', (task) => {
      this.updateTask(task);
    });

    this.emitter.subscribe('DELETE_ITEM', (id) => {
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
    this.counterId += 1;

    this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
  }

  getTask(id) {
    return this.tasks.find((x) => x.id === id);
  }

  getTasks(filter = null) {
    if (filter === null) {
      return this.tasks.slice();
    }
    return this.tasks.filter((x) => x.isChecked === filter);
  }

  applyFilter(filter) {
    this.filter = filter;
    this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
  }

  updateTask(task) {
    const oldTask = this.getTask(task.id);
    oldTask.value = task.value;
    oldTask.isChecked = task.isChecked;

    this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((x) => x.id === id);
    this.tasks.splice(index, 1);
    this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
  }

  isEmpty() {
    return this.tasks.length === 0;
  }
}

decorate(injectable(), TaskListService);
decorate(inject(TYPES.EventEmitter), TaskListService, 0);

export default TaskListService;

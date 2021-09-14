import 'regenerator-runtime/runtime';
import { decorate, inject, injectable } from 'inversify';
import TYPES from '../constants/types';
// eslint-disable-next-line no-unused-vars

class TaskListService {
  constructor(emitter, apiService) {
    this.tasks = [];
    this.emitter = emitter;
    this.apiService = apiService;

    this.filter = null;

    this.emitter.subscribe('CHANGE_ITEM', (task) => {
      this.updateTask(task);
    });

    this.emitter.subscribe('DELETE_ITEM', (id) => {
      this.deleteTask(id);
    });

    this.initialize();
  }

  async initialize() {
    this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
  }

  async addTask(value) {
    const newTask = {
      value,
      isChecked: false,
    };
    const response = await this.apiService.post(newTask);
    if (response) {
      this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
    }
  }

  async getTask(id) {
    const task = await this.apiService.getSingle(id);
    return task;
  }

  async getTasks(filter = null) {
    const tasks = await this.apiService.getAll();
    if (filter === null) {
      return tasks;
    }
    return tasks.filter((x) => x.isChecked === filter);
  }

  async applyFilter(filter) {
    this.filter = filter;
    this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
  }

  async updateTask(task) {
    const updatedTask = await this.apiService.put(task);
    console.log(updatedTask);
    this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
  }

  async deleteTask(id) {
    const deletedTask = await this.apiService.delete(id);
    console.log(deletedTask);

    this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
  }

  async isEmpty() {
    const tasks = await this.getTasks(this.filter);
    return tasks.length === 0;
  }
}

decorate(injectable(), TaskListService);
decorate(inject(TYPES.EventEmitter), TaskListService, 0);
decorate(inject(TYPES.TaskApiService), TaskListService, 1);

export default TaskListService;

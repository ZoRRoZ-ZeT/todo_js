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
    this.tasks = [...(await this.apiService.getAll())];
    this.emitter.emit('RENDER_LIST', await this.getTasks(this.filter));
  }

  addTask(value) {
    try {
      const newTask = {
        value,
        isChecked: false,
      };

      this.apiService.createTask(newTask).then((response) => {
        this.tasks.push(response);
        this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
      });
    } catch (error) {
      console.log(error);
    }
  }

  getTask(id) {
    return this.tasks.find((x) => x.id === +id);
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
    try {
      this.apiService.updateTask(task).then((response) => {
        const oldTask = this.getTask(response.id);
        oldTask.value = response.value;
        oldTask.isChecked = response.isChecked;

        this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteTask(id) {
    try {
      this.apiService.deleteTask(id).then((response) => {
        const deletedTask = response;
        const deletedIndex = this.tasks.findIndex(
          (x) => x.id === deletedTask.id
        );
        this.tasks.splice(deletedIndex, 1);
        this.emitter.emit('RENDER_LIST', this.getTasks(this.filter));
      });
    } catch (error) {
      console.log(error);
    }
  }

  isEmpty() {
    return this.tasks.length === 0;
  }
}

decorate(injectable(), TaskListService);
decorate(inject(TYPES.EventEmitter), TaskListService, 0);
decorate(inject(TYPES.TaskApiService), TaskListService, 1);

export default TaskListService;

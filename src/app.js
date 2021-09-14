/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Container } from 'inversify';

import TYPES from './constants/types';
import TaskListService from './services/tasklist.service';
import EventEmitter from './emitter/emitter';
import TaskHeaderComponent from './components/header/taskheader.component';
import TaskListComponent from './components/task-list/tasklist.component';
import TaskFooterComponent from './components/footer/taskfooter.component';
import TaskApiService from './services/taskapi.service';

class Application {
  initializeContainer() {
    this.container = new Container();

    this.container.bind(TYPES.EventEmitter).to(EventEmitter).inSingletonScope();

    this.container
      .bind(TYPES.TaskListService)
      .to(TaskListService)
      .inSingletonScope();
    this.container
      .bind(TYPES.TaskApiService)
      .to(TaskApiService)
      .inSingletonScope();

    this.container.bind(TYPES.TaskHeaderComponent).to(TaskHeaderComponent);
    this.container.bind(TYPES.TaskListComponent).to(TaskListComponent);
    this.container.bind(TYPES.TaskFooterComponent).to(TaskFooterComponent);
  }

  run() {
    this.initializeContainer();

    this.taskHeader = this.container.get(TYPES.TaskHeaderComponent);
    this.taskList = this.container.get(TYPES.TaskListComponent);
    this.taskFooter = this.container.get(TYPES.TaskFooterComponent);
  }
}

export default Application;

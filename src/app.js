/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Container } from 'inversify';

import TYPES from './constant/types';
import TaskListService from './services/tasklist.service';
import EventEmitter from './emitter/emitter';
import TaskHeaderComponent from './components/header/taskheader.component';
import TaskListComponent from './components/tasklist.component';
import TaskFooterComponent from './components/taskfooter.component';

export default class Application {
  startup() {
    this.container = new Container();
    this.container.bind(TYPES.EventEmitter).to(EventEmitter).inSingletonScope();
    this.container
      .bind(TYPES.TaskListService)
      .to(TaskListService)
      .inSingletonScope();
    this.container.bind(TYPES.TaskHeaderComponent).to(TaskHeaderComponent);
    this.container.bind(TYPES.TaskListComponent).to(TaskListComponent);
    this.container.bind(TYPES.TaskFooterComponent).to(TaskFooterComponent);
  }

  run() {
    if (!this.container) {
      return;
    }

    this.taskHeader = this.container.get(TYPES.TaskHeaderComponent);
    this.taskList = this.container.get(TYPES.TaskListComponent);
    this.taskFooter = this.container.get(TYPES.TaskFooterComponent);
  }
}

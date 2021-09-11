/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Container } from 'inversify';

import TYPES from './constant/types';
import TaskListService from './services/tasklist.service';
import EventEmitter from './emitter/emitter';
import TaskInputComponent from './components/taskinput.component';
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
    this.container.bind(TYPES.TaskInputComponent).to(TaskInputComponent);
    this.container.bind(TYPES.TaskListComponent).to(TaskListComponent);
    this.container.bind(TYPES.TaskFooterComponent).to(TaskFooterComponent);
  }

  run() {
    if (!this.container) {
      return;
    }

    const taskInput = this.container.get(TYPES.TaskInputComponent);
    const taskList = this.container.get(TYPES.TaskListComponent);
    const taskFooter = this.container.get(TYPES.TaskFooterComponent);

    console.log('taskInput', taskInput);
    console.log('taskList', taskList);
    console.log('taskFooter', taskFooter);
  }
}

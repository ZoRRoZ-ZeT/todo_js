/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Container } from 'inversify';

import TYPES from './constant/types';
import TaskListService from './services/tasklist.service';
import EventEmitter from './emitter/emitter';
import TaskInputComponent from './components/taskinput.component';

export default class Application {
  startup() {
    this.container = new Container();
    this.container.bind(TYPES.EventEmitter).to(EventEmitter).inSingletonScope();
    this.container
      .bind(TYPES.TaskListService)
      .to(TaskListService)
      .inSingletonScope();
    this.container.bind(TYPES.TaskInputComponent).to(TaskInputComponent);
  }

  run() {
    if (!this.container) {
      return;
    }

    const taskInput = this.container.get(TYPES.TaskInputComponent);
    console.log('taskInput', taskInput);
  }
}

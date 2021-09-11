/* eslint-disable no-unused-vars */
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../../constant/types';
import TaskListService from '../../services/tasklist.service';
import TaskInputComponent from './elements/taskinput.component';
import TaskTogglerComponent from './elements/tasktoggler.component';

export default class TaskHeaderComponent {
  /**
   *
   * @param {TaskListService} taskListService
   */
  constructor(taskListService) {
    this.taskListService = taskListService;

    this.taskInputComponent = new TaskInputComponent(this.taskListService);
    this.taskTogglerComponent = new TaskTogglerComponent(this.taskListService);
  }
}

decorate(injectable(), TaskHeaderComponent);
decorate(inject(TYPES.TaskListService), TaskHeaderComponent, 0);

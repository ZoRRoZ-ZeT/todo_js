/* eslint-disable no-unused-vars */
import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../constant/elements';
import TYPES from '../constant/types';

import TaskListService from '../services/tasklist.service';

export default class TaskInputComponent {
  /**
   *
   * @param {TaskListService} taskListService
   */
  constructor(taskListService) {
    this.taskListService = taskListService;
    this.inputElement = document.getElementById(ELEMENTS.Input);

    this.inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.submitTask();
      }
    });
  }

  submitTask() {
    if (this.inputElement.value === '') {
      this.inputElement.classList.add('invalid');
      return;
    }
    this.inputElement.classList.remove('invalid');
    this.taskListService.addTask(this.inputElement.value);
    this.inputElement.value = '';
  }
}

decorate(injectable(), TaskInputComponent);
decorate(inject(TYPES.TaskListService), TaskInputComponent, 0);

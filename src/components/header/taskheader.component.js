import './taskheader.component.scss';

/* eslint-disable no-unused-vars */
import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../../constant/elements';

import TYPES from '../../constant/types';

import TaskInputComponent from './elements/input/taskinput.component';
import TaskTogglerComponent from './elements/toggler/tasktoggler.component';

class TaskHeaderComponent {
  constructor(taskListService) {
    this.taskListService = taskListService;

    this.taskInputComponent = new TaskInputComponent(this.taskListService);
    this.taskTogglerComponent = new TaskTogglerComponent(this.taskListService);

    this.form = document.querySelector(ELEMENTS.FORM);
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}

decorate(injectable(), TaskHeaderComponent);
decorate(inject(TYPES.TaskListService), TaskHeaderComponent, 0);

export default TaskHeaderComponent;

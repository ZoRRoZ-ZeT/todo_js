/* eslint-disable no-unused-vars */
import ELEMENTS from '../../../constant/elements';

import TaskListService from '../../../services/tasklist.service';

export default class TaskTogglerComponent {
  /**
   *
   * @param {TaskListService} taskListService
   */
  constructor(taskListService) {
    this.taskListService = taskListService;
    this.togglerElement = document.getElementById(ELEMENTS.Toggler);

    this.togglerElement.addEventListener('click', (event) => {
      this.toggleTasks();
    });
  }

  toggleTasks() {
    const tasks = this.taskListService.getTasks();
    const fillValue = tasks.reduce(
      (result, item) => result && item.isChecked,
      true
    );

    tasks.forEach((item) => {
      item.isChecked = !fillValue;
      this.taskListService.updateTask(item);
    });
  }
}

import './tasktoggler.component.scss';

/* eslint-disable no-unused-vars */
import ELEMENTS from '../../../../constants/elements';

class TaskTogglerComponent {
  constructor(taskListService) {
    this.taskListService = taskListService;
    this.togglerElement = document.getElementById(ELEMENTS.TOGGLER);

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

export default TaskTogglerComponent;

import './taskinput.component.scss';

/* eslint-disable no-unused-vars */
import ELEMENTS from '../../../../constant/elements';

class TaskInputComponent {
  constructor(taskListService) {
    this.taskListService = taskListService;
    this.inputElement = document.getElementById(ELEMENTS.INPUT);

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

export default TaskInputComponent;
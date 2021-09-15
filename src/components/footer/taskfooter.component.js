/* eslint-disable no-unused-vars */
import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../../constants/elements';
import TYPES from '../../constants/types';
import STATUSES from '../../constants/statuses';

class TaskFooterComponent {
  constructor(taskListService, emitter) {
    this.taskListService = taskListService;
    this.emitter = emitter;

    this.footer = document.getElementById(ELEMENTS.FOOTER);

    this.allButton = document.getElementById(ELEMENTS.BUTTON_ALL);
    this.activeButton = document.getElementById(ELEMENTS.BUTTON_ACTIVE);
    this.completeButton = document.getElementById(ELEMENTS.BUTTON_COMPLETE);

    this.leftCount = document.getElementById(ELEMENTS.COUNT);
    this.clearButton = document.getElementById(ELEMENTS.CLEAR);

    this.emitter.subscribe('RENDER_LIST', () => {
      this.updateCount();
    });

    this.initializeButtons();
  }

  updateCount() {
    const tasks = this.taskListService.getTasks();
    if (!tasks.length) {
      this.footer.classList.add('hide');
      return;
    }
    const count = this.taskListService.getTasks(STATUSES.ACTIVE).length;
    this.clearButton.classList.add('hide');
    if (count !== tasks.length) {
      this.clearButton.classList.remove('hide');
    }
    this.footer.classList.remove('hide');
    this.leftCount.innerText = `${count} items left`;
  }

  initializeButtons() {
    this.allButton.onclick = () => {
      this.resetColors();
      window.history.pushState('', '', '/all');
      this.allButton.classList.add('active');
      this.taskListService.applyFilter(STATUSES.ALL);
    };

    this.activeButton.onclick = () => {
      this.resetColors();
      window.history.pushState('', '', '/active');
      this.activeButton.classList.add('active');
      this.taskListService.applyFilter(STATUSES.ACTIVE);
    };

    this.completeButton.onclick = () => {
      this.resetColors();
      window.history.pushState('', '', '/complete');
      this.completeButton.classList.add('active');
      this.taskListService.applyFilter(STATUSES.COMPLETED);
    };

    this.clearButton.onclick = () => {
      const toRemove = this.taskListService.getTasks(true);
      toRemove.forEach((task) => {
        this.taskListService.deleteTask(task.id);
      });
    };
  }

  resetColors() {
    this.allButton.classList.remove('active');
    this.activeButton.classList.remove('active');
    this.completeButton.classList.remove('active');
  }
}

decorate(injectable(), TaskFooterComponent);
decorate(inject(TYPES.TaskListService), TaskFooterComponent, 0);
decorate(inject(TYPES.EventEmitter), TaskFooterComponent, 1);

export default TaskFooterComponent;

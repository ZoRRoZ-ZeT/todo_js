import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../constant/elements';
import TYPES from '../constant/types';
// eslint-disable-next-line no-unused-vars
import TaskListService from '../services/tasklist.service';

export default class TaskFooterComponent {
  /**
   *
   * @param {TaskListService} taskListService
   */
  constructor(taskListService) {
    this.taskListService = taskListService;

    this.footer = document.getElementById(ELEMENTS.Footer);

    this.allButton = document.getElementById(ELEMENTS.Button_All);
    this.activeButton = document.getElementById(ELEMENTS.Button_Active);
    this.completeButton = document.getElementById(ELEMENTS.Button_Complete);

    this.leftCount = document.getElementById(ELEMENTS.Count);
    this.clearButton = document.getElementById(ELEMENTS.Clear);

    this.taskListService.emitter.subscribe('ITEM_CHANGED', () => {
      this.updateCount();
    });

    this.taskListService.emitter.subscribe('LIST_CHANGED', () => {
      this.updateCount();
    });

    this.updateCount();

    this.initializeButtons();
  }

  updateCount() {
    if (this.taskListService.isEmpty()) {
      this.footer.classList.add('hide');
      return;
    }
    const count = this.taskListService.getTasks(false).length;
    this.footer.classList.remove('hide');
    this.leftCount.innerText = `${count} items left`;
  }

  initializeButtons() {
    this.allButton.onclick = () => {
      this.resetColors();
      this.allButton.classList.add('active');
      this.taskListService.applyFilter(null);
    };

    this.activeButton.onclick = () => {
      this.resetColors();
      this.activeButton.classList.add('active');
      this.taskListService.applyFilter(false);
    };

    this.completeButton.onclick = () => {
      this.resetColors();
      this.completeButton.classList.add('active');
      this.taskListService.applyFilter(true);
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

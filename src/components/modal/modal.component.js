/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';
import ELEMENTS from '../../constants/elements.js';
import TYPES from '../../constants/types.js';
import { getColorFromClass } from '../../utils/color-transforming.js';
import PieChartComponent from './pie-chart/piechart.component.js';

class ModalComponent {
  constructor(emitter, taskListService) {
    this.emitter = emitter;
    this.taskListService = taskListService;
    this.modal = document.getElementById(ELEMENTS.MODAL);

    this.emitter.subscribe('RENDER_LIST', (tasks) => {
      const values = {};
      tasks
        .map((task) => task.priority)
        .forEach((x) => {
          values[x] = (values[x] || 0) + 1;
        });
      this.updataPieChart(values, tasks.length);
    });

    this.initialize();
  }

  initializeBody() {
    this.modalWindowBody = this.modal.querySelector('.content-window__body');

    this.pieChart = new PieChartComponent();
    this.modalWindowBody.insertBefore(
      this.pieChart.getHtmlComponent(),
      this.modalWindowBody.firstChild
    );
  }

  moveWindow(position, windowRect) {
    let left = position.x;
    let top = position.y;

    if (left < 50 - windowRect.width) {
      left = 50 - windowRect.width;
    }
    if (left > window.innerWidth + windowRect.width - 50) {
      left = window.innerWidth + windowRect.width - 50;
    }

    if (top < -10) {
      top = -10;
    }
    if (top > window.innerHeight - 30) {
      top = window.innerHeight - 30;
    }

    this.modalWindow.style.left = `${left}px`;
    this.modalWindow.style.top = `${top}px`;
  }

  initializeHeader() {
    this.modalWindowHeader = this.modal.querySelector(
      '.content-window__header'
    );

    this.modalWindowHeader.addEventListener('mousedown', (event) => {
      const rect = this.modalWindowHeader.getBoundingClientRect();
      const currentPosition = {
        x: event.x,
        y: event.y,
      };
      this.modalWindow.style.transform = 'none';
      this.modalWindow.style.left = `${rect.x}px`;
      this.modalWindow.style.top = `${rect.y}px`;

      const movementHandler = (mouseEvent) => {
        const left = rect.x + (mouseEvent.x - currentPosition.x);
        const top = rect.y + (mouseEvent.y - currentPosition.y);

        this.moveWindow({ x: left, y: top }, rect);
      };

      document.addEventListener('mousemove', movementHandler);

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', movementHandler);
      });
    });
  }

  initialize() {
    this.modalButton = this.modal.querySelector('.modal__button');
    this.modalShadow = this.modal.querySelector('.modal__shadow');
    this.modalWindow = this.modal.querySelector('.modal__content');

    this.modalButton.addEventListener('click', () => {
      this.toggleModal();
    });

    this.closeButton = this.modalWindow.querySelector('.close');
    this.closeButton.addEventListener('click', () => {
      this.toggleModal();
    });

    this.initializeBody();
    this.initializeHeader();
  }

  updataPieChart(values, count) {
    const sectors = [];
    let currentFill = 0;
    Object.keys(values).forEach((key) => {
      let hexColor = getColorFromClass(`.mark-${key}`);
      if (hexColor === '#000000') hexColor = '#ffffff';

      const filling = (values[key] / count) * 100;
      const sector = {
        color: hexColor,
        start: currentFill,
        end: currentFill + filling,
        value: values[key],
        total: count,
      };
      currentFill += filling;
      sectors.push(sector);
    });

    this.pieChart.updateDataSet(sectors);
  }

  toggleModal() {
    this.modalWindow.classList.toggle('show');
    this.modalShadow.classList.toggle('show');

    this.pieChart.updateColor();
  }
}

decorate(injectable(), ModalComponent);
decorate(inject(TYPES.EventEmitter), ModalComponent, 0);
decorate(inject(TYPES.TaskListService), ModalComponent, 1);

export default ModalComponent;

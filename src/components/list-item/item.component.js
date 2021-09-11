export default class ItemComponent {
  /**
   *
   * @param {*} task
   * @param {EventEmitter} emitter
   */
  constructor(emitter, task) {
    this.taskData = task;
    this.emitter = emitter;

    this.element = document.createElement('li');
    this.element.classList.add('task-list__item');

    this.initialize();
  }

  initialize() {
    const container = document.createElement('div');
    container.classList.add('item');

    this.toggler = this.togglerInitialize();
    this.label = this.labelInitialize();
    this.taskChanger = this.taskChangerInitialize();
    this.deleteButton = this.deleteButtonInitialize();

    container.appendChild(this.toggler);
    container.appendChild(this.label);
    container.appendChild(this.taskChanger);
    container.appendChild(this.deleteButton);

    this.element.appendChild(container);
  }

  labelInitialize() {
    const label = document.createElement('label');
    label.classList.add('item__label');
    label.innerText = this.taskData.value;

    return label;
  }

  togglerInitialize() {
    const toggler = document.createElement('input');
    toggler.classList.add('item__toggle');
    toggler.setAttribute('type', 'checkbox');
    toggler.checked = this.taskData.isChecked;

    toggler.addEventListener('click', () => {
      this.taskData.isChecked = toggler.checked;
      this.emitter.emit('ITEM_CHANGED', this.taskData);
    });

    return toggler;
  }

  taskChangerInitialize() {
    const taskChanger = document.createElement('input');
    taskChanger.classList.add('item__edit');
    taskChanger.setAttribute('type', 'text');
    taskChanger.value = this.taskData.value;

    const valueChanger = (value) => {
      if (taskChanger.value === this.taskData.value) {
        return;
      }
      this.taskData.value = value;
      this.label.innerText = value;
    };

    taskChanger.addEventListener('focusout', () => {
      valueChanger(taskChanger.value);
    });
    taskChanger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        valueChanger(taskChanger.value);
      }
    });

    return taskChanger;
  }

  deleteButtonInitialize() {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-red', 'destroy');
    button.innerText = 'X';

    button.addEventListener('click', () => {
      this.emitter.emit('ITEM_DELETED', this.taskData.id);
    });

    return button;
  }

  getHtmlComponent() {
    return this.element;
  }
}

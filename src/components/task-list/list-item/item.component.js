import './item.component.scss';

class ItemComponent {
  constructor(emitter, task) {
    this.taskData = task;
    this.emitter = emitter;

    this.isClicked = false;
    this.editing = false;

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

    label.addEventListener('click', () => {
      if (this.isClicked) {
        this.label.classList.add('clicked');
        this.taskChanger.focus();
        this.isClicked = false;
        this.editing = true;
        return;
      }
      this.isClicked = true;

      setTimeout(() => {
        if (!this.editing) {
          this.isClicked = false;
        }
      }, 200);
    });

    return label;
  }

  togglerInitialize() {
    const toggler = document.createElement('input');
    toggler.classList.add('item__toggle');
    toggler.setAttribute('type', 'checkbox');
    toggler.checked = this.taskData.isChecked;

    toggler.addEventListener('click', () => {
      this.taskData.isChecked = toggler.checked;
      this.emitter.emit('CHANGE_ITEM', this.taskData);
    });

    return toggler;
  }

  taskChangerInitialize() {
    const taskChanger = document.createElement('input');
    taskChanger.classList.add('item__edit');
    taskChanger.setAttribute('type', 'text');
    taskChanger.value = this.taskData.value;

    const valueChanger = (value) => {
      this.label.classList.remove('clicked');
      this.editing = false;
      if (taskChanger.value !== this.taskData.value) {
        this.taskData.value = value;
        this.label.innerText = value;
        this.emitter.emit('CHANGE_ITEM', this.taskData);
      }
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
      this.emitter.emit('DELETE_ITEM', this.taskData.id);
    });

    return button;
  }

  getHtmlComponent() {
    return this.element;
  }
}

export default ItemComponent;

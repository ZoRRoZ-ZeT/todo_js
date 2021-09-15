import PRIORITIES from '../../../../constants/priorities';

class DropdownComponent {
  constructor(emitter, taskData) {
    this.emitter = emitter;
    this.taskData = taskData;

    this.initialize();
  }

  initialize() {
    this.dropdownBlock = document.createElement('div');
    this.dropdownBlock.classList.add('item__dropdown', 'dropdown-block');

    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('dropdown-block__button');

    this.dropdownContent = this.generateContent();

    dropdownBtn.addEventListener('click', () => {
      this.dropdownContent.classList.toggle('show');
    });

    this.dropdownBlock.appendChild(dropdownBtn);
    this.dropdownBlock.appendChild(this.dropdownContent);
  }

  generateContent() {
    const content = document.createElement('div');
    content.classList.add('dropdown-block__content', 'content-list');

    Object.values(PRIORITIES).forEach((priority) => {
      const option = document.createElement('a');
      option.classList.add('content-list__item');
      option.setAttribute('data-priority', priority.value);
      option.innerText = `${priority.value} priority`;

      content.appendChild(option);
    });

    content.addEventListener('click', (event) => {
      if (event.target.tagName !== 'A') {
        return;
      }
      content.classList.remove('show');
      this.taskData.priority = event.target.getAttribute('data-priority');
      this.emitter.emit('CHANGE_PRIORITY', this.taskData);
    });

    return content;
  }

  getHtmlComponent() {
    return this.dropdownBlock;
  }
}

export default DropdownComponent;

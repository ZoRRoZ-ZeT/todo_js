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
    dropdownBtn.classList.add(`mark-${this.taskData.priority}`);
    this.dropdownContent = this.generateContent();

    dropdownBtn.addEventListener('click', () => {
      this.dropdownContent.classList.toggle('show');
    });

    document.addEventListener('mousedown', (event) => {
      let node = event.target;
      while (node) {
        if (node === this.dropdownBlock) {
          return;
        }
        node = node.parentNode;
      }
      this.dropdownContent.classList.remove('show');
    });

    this.dropdownBlock.appendChild(dropdownBtn);
    this.dropdownBlock.appendChild(this.dropdownContent);
  }

  generateContent() {
    const content = document.createElement('div');
    content.classList.add('dropdown-block__content', 'content-list');

    const capitalise = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Object.values(PRIORITIES).forEach((priority) => {
      const option = document.createElement('div');
      option.classList.add('content-list__item', 'dropdown-item');
      option.setAttribute('data-priority', priority);

      if (this.taskData.priority === priority) {
        option.classList.add('selected');
      }

      const marker = document.createElement('div');
      marker.classList.add('dropdown-item__marker');
      marker.classList.add(`mark-${priority}`);

      const caption = document.createElement('span');
      caption.classList.add('dropdown-item__caption');
      caption.innerText = `${capitalise(priority)} priority`;

      option.appendChild(marker);
      option.appendChild(caption);

      content.appendChild(option);
    });

    content.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!content.hasChildNodes(event.target)) {
        return;
      }

      content.classList.remove('show');
      this.taskData.priority = event.target
        .closest('div')
        .getAttribute('data-priority');
      this.emitter.emit('CHANGE_ITEM', this.taskData);
    });

    return content;
  }

  getHtmlComponent() {
    return this.dropdownBlock;
  }
}

export default DropdownComponent;

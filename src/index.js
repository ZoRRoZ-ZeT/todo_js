import './style.scss';

const input = document.getElementById('taskInput');
const list = document.getElementById('list');
const checkButton = document.getElementById('checkButton');

const footer = document.querySelector('.footer');
const clearButton = document.querySelector('.footer__clear');

const allButton = document.getElementById('allButton');
const activeButton = document.getElementById('activeButton');
const completeButton = document.getElementById('completeButton');

const form = document.querySelector('.add-form');

let tasks = [];
let currentId = 0;

let filtered = null;

const currentTaskClicked = {
  task: null,
  isEditing: false,
};

const resetTaskEditing = () => {
  currentTaskClicked.task.classList.remove('clicked');
  currentTaskClicked.isEditing = false;
  currentTaskClicked.task = null;
};

const changeValue = (target, newValue) => {
  if (target instanceof HTMLElement) {
    target.previousElementSibling.innerText = newValue;
    const id = +target.nextElementSibling.getAttribute('task');
    const task = tasks.find((x) => x.id === id);
    task.name = newValue;
    resetTaskEditing();
  }
};

const createItem = (name, id, isChecked) => {
  const item = document.createElement('li');
  const checked = isChecked ? 'checked' : '';
  item.classList.add('task-list__item');
  item.innerHTML = `
        <div class="item">
            <input class="item__toggle" type="checkbox" name="toggler" task="${id}" ${checked}>
            <label class="item__label">${name}</label>
            <input type="text" class="item__edit" name="editer" value="${name}">
            <button class="btn btn-red destroy" type="button" task="${id}">X</button>
        </div>`;

  const labelEditor = item.querySelector('.item__edit');

  labelEditor.addEventListener('focusout', (event) => {
    if (currentTaskClicked.task !== null) {
      changeValue(event.target, event.target.value);
    }
  });
  labelEditor.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      changeValue(event.target, event.target.value);
    }
  });

  return item;
};

const updateList = () => {
  let filteredTasks = tasks;
  if (filtered !== null) {
    filteredTasks = filteredTasks.filter((x) => x.isChecked === filtered);
  }

  if (tasks.length === 0) {
    footer.style.display = 'none';
    return;
  }

  list.innerHTML = '';
  footer.style.display = '';

  const count = tasks.reduce((result, item) => {
    // eslint-disable-next-line no-param-reassign
    result += !item.isChecked;
    return result;
  }, 0);

  const countElement = footer.children[0];
  countElement.innerText = `${count} items left`;

  if (count === tasks.length) {
    clearButton.style.display = 'none';
  } else {
    clearButton.style.display = '';
  }

  filteredTasks.forEach((item) => {
    const li = createItem(item.name, item.id, item.isChecked);
    list.appendChild(li);
  });
};

updateList();

const addItem = (name) => {
  tasks.push({
    name,
    id: currentId,
    isChecked: false,
  });
  currentId += 1;

  updateList();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value === '') {
    input.classList.add('invalid');
    return;
  }
  input.classList.remove('invalid');

  addItem(input.value);

  input.value = '';
});

const resetColors = () => {
  allButton.classList.remove('active');
  activeButton.classList.remove('active');
  completeButton.classList.remove('active');
};

allButton.onclick = () => {
  resetColors();
  allButton.classList.add('active');
  filtered = null;
  updateList();
};

activeButton.onclick = () => {
  resetColors();
  activeButton.classList.add('active');
  filtered = false;
  updateList();
};

completeButton.onclick = () => {
  resetColors();
  completeButton.classList.add('active');
  filtered = true;
  updateList();
};

checkButton.addEventListener('click', () => {
  const fillValue = tasks.reduce(
    (result, item) => result && item.isChecked,
    true
  );
  tasks.forEach((item) => {
    item.isChecked = !fillValue;
  });
  updateList();
});

const editTask = (task) => {
  task.classList.add('clicked');
  task.nextElementSibling.focus();
};

const deleteTask = (taskId) => {
  tasks.splice(
    tasks.findIndex((x) => x.id === taskId),
    1
  );
  updateList();
};

list.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    deleteTask(+event.target.getAttribute('task'));
    return;
  }

  if (event.target.tagName === 'INPUT') {
    if (event.target.name !== 'toggler') {
      return;
    }
    const task = tasks.find((x) => x.id === +event.target.getAttribute('task'));
    task.isChecked = !task.isChecked;
    updateList();
    return;
  }

  if (event.target.tagName === 'LABEL') {
    if (currentTaskClicked.task === event.target) {
      editTask(event.target);
      currentTaskClicked.isEditing = true;
      return;
    }
    currentTaskClicked.task = event.target;
    currentTaskClicked.isEditing = false;

    setTimeout(() => {
      if (!currentTaskClicked.isEditing) {
        resetTaskEditing();
      }
    }, 200);
  }
});

clearButton.addEventListener('click', () => {
  tasks = tasks.filter((x) => x.isChecked === false);
  updateList();
});

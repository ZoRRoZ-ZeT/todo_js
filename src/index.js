import Application from './app';
import './style.scss';

const form = document.querySelector('.add-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

const application = new Application();
application.startup();
application.run();

import {el, mount} from 'redom';

// import {el, mount} from "https://redom.js.org/redom.es.min.js";

export default class Form {
  constructor() {
  }
  renderForm() {
    if (this.rootElement) return this.rootElement;
    const rootForm = el('form', '', {action: '#'});
    const submitBtn = el('button.btn', 'Отправить');

    mount(rootForm, submitBtn);
    rootForm.addEventListener('submit', (e) => e.preventDefault());

    this.rootElement = rootForm;
    this.submitBtn = submitBtn;
    return rootForm
  }
}

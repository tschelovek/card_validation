import {el, mount} from "redom";
import CardForm from "./Classes/CardForm.js";

function createPage() {
  const form = new CardForm(300);
  const page = el('.container bg-light d-md-flex align-items-center',
    el('.card box2 shadow-sm', form.renderForm()));
  console.log(form)
  return page
}

mount(document.getElementById('app'), createPage());

import {mount} from "redom";
import CardForm from "./Classes/CardForm.js";
// import {el, mount} from "https://redom.js.org/redom.es.min.js";
import {createPage} from "./render.js";

const {form, page} = createPage()

mount(document.getElementById('app'), page);


import {el, svg, setAttr, setChildren} from 'redom';
import Form from "./Form.js";
import {
  formatCardNumber,
  parseCardNumber,
  validateCardHolderName,
  validateCVC,
  validateEmail,
  validateLuhn
} from "../validation.js";

export default class CardForm extends Form {
  constructor(payment = 100500, onSubmit) {
    super();
    this.payment = payment;
    this.isValid = false;
    this.onSubmit = onSubmit;
  }

  get number() {
    return this._number
  }

  set number(value) {
    let cardNumber = parseCardNumber(value);
    if (validateLuhn(cardNumber)) {
      this._number = value
    } else {
      this._number = undefined;
      if (this.rootElement) this.inputCardNumber.classList.add('warning');
      throw new TypeError('Неверный номер карты');
    }
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (validateCardHolderName(value)) {
      this._name = value;
    } else {
      this._name = undefined;
      if (this.rootElement) this.inputName.classList.add('warning');
      throw new TypeError('Неверное имя');
    }
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (validateEmail(value)) {
      this._email = value;
    } else {
      this._email = undefined;
      if (this.rootElement) this.inputEmail.classList.add('warning');
      throw new TypeError('Неверный email');
    }
  }

  get cvv() {
    return this._cvv;
  }

  set cvv(value) {
    if (validateCVC(value)) {
      this._cvv = value;
    } else {
      this._cvv = undefined;
      throw new TypeError('Неверный CVV')
    }
  }

  renderForm() {
    if (this.rootElement) return this.rootElement;
    this.rootElement = super.renderForm();
    this.inputCardNumber = el('input.form-control', {placeholder: '0000 0000 0000 0000', type: 'text'});
    this.inputDate = el('input.form-control', {type: 'text', placeholder: '07/26'});
    this.inputCVV = el('input.form-control', {type: 'password', placeholder: '000'});
    this.inputName = el('input.form-control', {type: 'text', placeholder: 'Kevin Durant'});
    this.inputEmail = el('input.form-control', {type: 'text', placeholder: 'example@mail.bag'});

    this.inputCardNumber.addEventListener('blur', () => {
      const cardNumber = parseCardNumber(this.inputCardNumber.value);

      this.inputCardNumber.classList.remove('warning');
      this.inputCardNumber.value = `${formatCardNumber(cardNumber)}`

      if (cardNumber.length < 16) {
        this.inputCardNumber.classList.add('warning');
        return
      }
      this.number = cardNumber;
    });
    this.inputCVV.addEventListener('blur', () => {
      const cvvNumber = this.inputCVV.value.trim();

      this.inputCVV.classList.remove('warning');
      if (cvvNumber.length !== 3) {
        this.inputCVV.classList.add('warning');
        return
      }
      this.cvv = cvvNumber;
    });
    this.inputEmail.addEventListener('blur', () => {
      this.inputEmail.classList.remove('warning');
      this.email = this.inputEmail.value.trim();
    });
    this.inputName.addEventListener('blur', () => {
      this.inputName.classList.remove('warning');
      this.name = this.inputName.value.trim();
    });
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(this);
    });

    setAttr(this.submitBtn, {className: 'btn btn-primary w-100', disabled: true});
    this.submitBtn.textContent = `К оплате ${this.payment} руб.`;

    setChildren(this.rootElement, [
      el('.row',
        el('.col-12',
          el('.d-flex flex-column px-md-5 px-4 mb-4',
            el('label', 'Credit Card',
              el('.inputWithIcon', [
                this.inputCardNumber,
                el('span.card-type')
              ]))
          )),
        el('.col-md-6',
          el('.d-flex flex-column ps-md-5 px-md-0 px-4 mb-4',
            el('label', 'Expiration Date',
              el('.inputWithIcon', [
                this.inputDate,
                el('span.fas fa-calendar-alt')
              ]))
          )),
        el('.col-md-6',
          el('.d-flex flex-column pe-md-5 px-md-0 px-4 mb-4',
            el('label', 'Code CVV',
              el('.inputWithIcon', [
                this.inputCVV,
                el('span.fas fa-calendar-alt')
              ]))
          )),
        el('.col-12',
          el('.d-flex flex-column px-md-5 px-4 mb-4',
            el('label', 'Name',
              el('.inputWithIcon', [
                this.inputName,
                el('span.fas fa-calendar-alt')
              ]))
          )),
        el('.col-12',
          el('.d-flex flex-column px-md-5 px-4 mb-4',
            el('label', 'e-mail',
              el('.inputWithIcon', [
                this.inputEmail,
                el('span.fas fa-calendar-alt')
              ]))
          )),
        el('.col-12 px-md-5 px-4 mt-3', this.submitBtn),
      )
    ]);

    return this.rootElement;
  }
}


import {el, svg, setAttr, setChildren} from 'redom';
import Form from "./Form.js";
import ValidationError from "./ValidationError.js";
import CardValidator from "./CardValidator.js";

export default class CardForm extends Form {
  constructor(payment = 100500, onSubmit = () => {
  }) {
    super();
    this.payment = payment;
    this.isValid = false;
    this.onSubmit = onSubmit;
    this.validator = new CardValidator();
  }

  //* В сеттерах валидируем данные, при отказе — выбрасываем ошибку ValidationError, которую обрабатываем в хэндлерах
  get number() {
    return this._number
  }

  set number(value) {
    let cardNumber = this.validator.parseCardNumber(value);

    //* Проходим первичную проверку алгоритмом Луна, либо устанавливаем сеттером undefind и выбрасываем исключение
    if (this.validator.validateLuhn(cardNumber)) {
      const type = this.validator.getCardType(cardNumber);

      //* Проверяем, соответствует ли номер карты, допустимым типам карт => устанавливаем значения
      if (this.validator.validateCardNumber(cardNumber)) {
        this._number = cardNumber;
        this.type = type;
        this.checkFullCardValidation();
        return;
      }
      this._number = undefined;
      this.isValid = false;
      throw new ValidationError('Неверный номер карты', ['inputCardNumber']);
    }
    this._number = undefined;
    this.isValid = false;
    throw new ValidationError('Неверный номер карты', ['inputCardNumber']);
  }

  get date() {
    return this._date;
  }

  set date(value) {
    const month = this.validator.parseMonth(value.slice(0, 2));
    const year = this.validator.parseYear(value.slice(-2));
    if (!this.validator.monthIsValid(month)) {
      this._date = undefined;
      this.isValid = false;
      throw new ValidationError('Неверная дата', ['inputDate']);
    }
    if (!this.validator.yearIsValid(year)) {
      this._date = undefined;
      this.isValid = false;
      throw new ValidationError('Неверная дата', ['inputDate']);
    }
    if (!this.validator.isPast(month, year)) {
      this._date = new Date(year, month);
      this.checkFullCardValidation();
      return;
    }
    this._date = undefined;
    this.isValid = false;
    throw new ValidationError('Неверная дата', ['inputDate']);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (this.validator.validateCardHolderName(value)) {
      this._name = value.toUpperCase();
      this.checkFullCardValidation();
      return;
    }
    this._name = undefined;
    this.isValid = false;
    throw new ValidationError('Неверное имя', ['inputName']);
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (this.validator.validateEmail(value)) {
      this._email = value;
      this.checkFullCardValidation();
      return;
    }
    this._email = undefined;
    this.isValid = false;
    throw new ValidationError('Неверный email', ['inputEmail']);
  }

  get cvv() {
    return this._cvv;
  }

  set cvv(value) {
    //* Валидируем CVC
    if (this.validator.validateCVC(value)) {
      //* Если уже установлен тип карты (введён валидный номер), валидируем CVC с учётом типа карты,
      // либо выбрасываем ошибку и подсвечиваем оба инпута (и номер какрты и CVC)
      if (this.type) {
        if (this.validator.validateCVC(value, this.type)) {
          this._cvv = value;
          this.checkFullCardValidation();
          return;
        }
        this._cvv = undefined;
        this.isValid = false;
        throw new ValidationError('Номер карты и CVV не совпадают', ['inputCardNumber', 'inputCVV']);
      }
      this._cvv = value;
      this.checkFullCardValidation();
      return;
    }
    this._cvv = undefined;
    this.isValid = false;
    throw new ValidationError('Неверный CVV', ['inputCVV']);
  }

  get type() {
    return this._type
  }

  //* TODO: добавить установку иконки платёжной системы
  set type(value) {
    this._type = value;
  }

  get isValid() {
    return this._isValid;
  }

  set isValid(bool) {
    this._isValid = bool;
    if(this.submitBtn) {
      bool
        ? setAttr(this.submitBtn,  {disabled: false})
        : setAttr(this.submitBtn,  {disabled: true});
    }
  }

  renderForm() {
    if (this.rootElement) return this.rootElement;
    this.rootElement = super.renderForm();
    //* Создаём нужные поля input
    this.inputCardNumber = el('input.form-control', {placeholder: '0000 0000 0000 0000', type: 'text'});
    this.inputDate = el('input.form-control', {type: 'text', placeholder: '07/26'});
    this.inputCVV = el('input.form-control', {type: 'password', placeholder: '000'});
    this.inputName = el('input.form-control', {type: 'text', placeholder: 'Kevin Durant'});
    this.inputEmail = el('input.form-control', {type: 'text', placeholder: 'example@mail.bag'});

    //* Переопределяем атрибуты кнопки submit родительского класса формы
    setAttr(this.submitBtn, {className: 'btn btn-primary w-100', disabled: true});
    this.submitBtn.textContent = `К оплате ${this.payment} руб.`;

    //*Обращаемся к приватным методам для #генерации вёрстки и #вешаем хэндлеры с обработчиками ValidationError
    this.#mountChildNodes();
    this.#addHandlers();

    return this.rootElement;
  }

  //* Добавляем вёрску в корневой элемент формы
  #mountChildNodes() {
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
  }

  //* eventListener`ы с обработчиками ValidationError от сеттеров
  #addHandlers() {
    //*  isValid = false если если производится ввод в данные поля. Валидация для них по 'blur'
    [this.inputCVV, this.inputName].forEach(element => {
      element.addEventListener('input', () => this.isValid = false);
    })
    //* Горячяя проверка вводимого значения и форматирование введённого номера в окне input`а
    this.inputCardNumber.addEventListener('beforeinput', e => {
      if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
        this.isValid = false;
      }

      if (typeof e.data === "string") {
        e.preventDefault();
        this.isValid = false;

        const cleanValue = this.validator.parseCardNumber(e.target.value + e.data);
        e.target.value = this.validator.formatCardNumber(cleanValue);
        if (cleanValue.length === 16) {
          try {
            this.number = cleanValue;
            e.target.classList.remove('warning');
          } catch (err) {
            if (err.name === 'ValidationError') {
              err.fields.forEach(field => this[field].classList.add('warning'));
              return;
            }
            throw err
          }
        }
      }
    });
    //* Устанавливаем сеттер number, обрабатываем ошибку валидации
    this.inputCardNumber.addEventListener('blur', e => {
      const cardNumber = this.validator.parseCardNumber(e.target.value);

      e.target.classList.remove('warning');
      e.target.value = `${this.validator.formatCardNumber(cardNumber)}`;

      try {
        this.number = cardNumber;
      } catch (err) {
        if (err.name === 'ValidationError') {
          err.fields.forEach(field => this[field].classList.add('warning'));
          return;
        }
        throw err
      }
    });
    //* Добавляем разделитель при вводе, проверяем валидность месяца
    this.inputDate.addEventListener('input', e => {
      if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
        this.isValid = false;
      }

      if (typeof e.data === "string") {
        const value = e.target.value.trim();
        if (value.length === 2) {
          //* Если введены два символа и второй '/', добавляем 0 перед номером месяца
          if (value.slice(-1) === '/') {
            e.target.value = 0 + e.target.value
            return;
          }
          //* Добавляем '/', валидируем значение месяца
          e.target.value += '/';
          if (this.validator.monthIsValid(this.validator.parseMonth(value))) {
            return;
          }
          e.target.classList.add('warning');
        }
      }
    })
    //* Форматируем содержимое input`а, устанавливаем сеттер date, обрабатываем ошибку валидации
    this.inputDate.addEventListener('blur', e => {
      e.target.classList.remove('warning');

      e.target.value = `${e.target.value.slice(0, 2)}/${e.target.value.slice(-2)}`
      console.log(e.target.value)

      try {
        this.date = e.target.value;
      } catch (err) {
        if (err.name === 'ValidationError') {
          err.fields.forEach(field => this[field].classList.add('warning'));
          return;
        }
        throw err
      }
    })
    //* Устанавливаем сеттер cvc, обрабатываем ошибку валидации
    this.inputCVV.addEventListener('blur', e => {
      const cvvNumber = e.target.value.trim();

      e.target.classList.remove('warning');

      try {
        this.cvv = cvvNumber;
      } catch (err) {
        if (err.name === 'ValidationError') {
          err.fields.forEach(field => this[field].classList.add('warning'));
          return;
        }
        throw err
      }
    });
    //* Устанавливаем сеттер name, обрабатываем ошибку валидации
    this.inputName.addEventListener('blur', e => {
      e.target.classList.remove('warning');

      try {
        this.name = e.target.value.trim();
        e.target.value = this.name;
      } catch (err) {
        if (err.name === 'ValidationError') {
          err.fields.forEach(field => this[field].classList.add('warning'));
          return;
        }
        throw err
      }
    });
    //* Устанавливаем сеттер email, обрабатываем ошибку валидации
    this.inputEmail.addEventListener('blur', e => {
      this.isValid = false;

      e.target.classList.remove('warning');

      try {
        this.email = e.target.value.trim();
      } catch (err) {
        if (err.name === 'ValidationError') {
          err.fields.forEach(field => this[field].classList.add('warning'));
          return;
        }
        throw err
      }
    });
    this.submitBtn.addEventListener('click', () => this.onSubmit());
  }

  checkFullCardValidation() {
    if (this.number && this.date && this.cvv && this.name && this.email) {
      this.isValid = true;
    }
  }
}


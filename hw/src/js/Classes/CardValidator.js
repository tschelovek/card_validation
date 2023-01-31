import Card from "creditcards/card.js";
import mir from "creditcards-types/types/mir.js";
import visa from "creditcards-types/types/visa.js";
import maestro from "creditcards-types/types/maestro.js";
import mastercard from "creditcards-types/types/mastercard.js";
import unionpay from "creditcards-types/types/unionpay.js";
import jcb from "creditcards-types/types/jcb.js";
import cvc from "creditcards/cvc.js";
import emailValidator from "email-validator";
import expiration from "creditcards/expiration.js";

export default class CardValidator {
  constructor() {
    //* Инициализируем экземпляры проверки номера карты и CVC на соответствие картам платёжных систем
    this.card = Card([mir, visa, maestro, mastercard, unionpay, jcb]);
    this.myCvc = cvc([mir, visa, maestro, mastercard, unionpay, jcb]);
  }

  parseCardNumber(number) {
    return this.card.parse(number);
  }

  validateLuhn(number) {
    return this.card.luhn(number);
  }

  //* Проверяем, соответствует ли номер карты типам карт, переданных при создании экземпляра валидатора card
//  второй аргумент необязательный - проверка на соответствии конкретному типу */
  validateCardNumber(number, type) {
    return this.card.isValid(number, type);
  }

  formatCardNumber(number) {
    return this.card.format(number);
  }

  getCardType(number) {
    return this.card.type(number);
  }

  isPast(month, year) {
    return expiration.isPast(month, year);
  }

  parseMonth(month) {
    return expiration.month.parse(month);
  }

  parseYear(year) {
    return expiration.year.parse(year, true);
  }

  formatYear(year, short = false) {
    return expiration.year.format(year, short);
  }

  monthIsValid(month) {
    return expiration.month.isValid(month);
  }

  yearIsValid(year) {
    return expiration.year.isValid(year);
  }

  validateCVC(cvcNumber, type) {
    return this.myCvc.isValid(cvcNumber, type);
  }

  validateEmail(email = '') {
    return emailValidator.validate(email);
  }

  validateCardHolderName(name = '') {
    const validate = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/;
    return validate.test(name);
  }
}

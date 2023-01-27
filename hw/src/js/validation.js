const Card = require('creditcards/card');
const cvc = require('creditcards/cvc');
const types = require('creditcards-types');
const mir = require('creditcards-types/types/mir');
const emailValidator = require("email-validator");

const card = Card([mir, ...types]);
const myCvc = cvc([mir, ...types])

export function parseCardNumber(number) {
  return card.parse(number);
}

export function validateLuhn(number) {
  return card.luhn(number);
}

export function formatCardNumber(number) {
  return card.format(number);
}

export function validateCVC(cvcNumber) {
  return myCvc.isValid(cvcNumber);
}

export function validateEmail(email = '') {
  return emailValidator.validate(email);
}

export function validateCardHolderName(name = '') {
  const validate = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/;
  return validate.test(name);
}

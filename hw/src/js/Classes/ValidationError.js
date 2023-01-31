export  default class ValidationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = this.constructor.name;
    this.fields = [...fields];
  }
}

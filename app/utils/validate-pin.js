import Ember from 'ember';

const pinRegex = /^[a-zA-Z]\d{8}$/;
const relaxedPinRegex = /^[a-zA-Z]\d{0,8}$/;
const isBlank = Ember.isBlank;

export function pinLooksValidSoFar(pin) {
  return isBlank(pin) || pin.length < 2 || relaxedPinRegex.test(pin);
}

export default function validatePin(pin) {
  return pin && pinRegex.test(pin);
}

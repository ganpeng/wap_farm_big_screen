import _ from 'lodash';
export function borderColor() {
  return ['#1F4071', '#417FC8'];
}

export function toFixed2(value) {
  return _.isNumber(value) ? value.toFixed(2) : '';
}

export function justToFixed2(value) {
  return _.isNumber(value) ? value.toFixed(2) : '';
}

import _ from 'lodash';
import {bankersRounding} from '@/util';
export function borderColor() {
  return ['#1F4071', '#417FC8'];
}

export function toFixed2(value) {
  if (_.isNumber(value)) {
    if ((value + '').split('.')[1]) {
      return bankersRounding(value, 2);
    } else {
      return value;
    }
  } else {
    return '';
  }
  // return _.isNumber(value) ? value.toFixed(2) : '';
}

export function justToFixed2(value) {
  return _.isNumber(value) ? value.toFixed(2) : '';
}

import moment from 'moment';

export function elapsedHours(timestamp) {
  return moment().diff(moment(timestamp), 'hours');
}

export function elapsedMinutes(timestamp) {
  return moment().diff(moment(timestamp), 'minutes') % 60;
}
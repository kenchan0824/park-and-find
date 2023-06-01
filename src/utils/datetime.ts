import moment from 'moment';

export function elapsedHours(timestamp) {
  return moment().diff(moment(timestamp), 'hours');
}

export function elapsedMinutes(timestamp) {
  return moment().diff(moment(timestamp), 'minutes') % 60;
}

export function remainingHours(timestamp, duration) {
  return moment(timestamp).add(duration, 'minutes').diff(moment(), 'hours');
}

export function remainingMinutes(timestamp, duration) {
  return moment(timestamp).add(duration, 'minutes').diff(moment(), 'minutes') % 60;
}

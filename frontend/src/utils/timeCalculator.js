const timeCalculator = (time, now = Date.now()) => {
  const timeToCompare = new Date(time);
  const timeNow = new Date(now);
  // change from millisecond to mintue
  const timeDiff = Math.floor(
    (timeNow.getTime() - timeToCompare.getTime()) * 1.66667e-5
  );
  if (timeDiff < 2) {
    return 'Just now';
  }
  if (timeDiff < 60) {
    return `${timeDiff}m`;
  }
  if (timeDiff < 1440) {
    return `${Math.floor(timeDiff / 60)}h`;
  }
  if (timeDiff < 10080) {
    return `${Math.floor(timeDiff / 1440)}d`;
  }
  return `${Math.floor(timeDiff / 10080)}w`;
};

export default timeCalculator;

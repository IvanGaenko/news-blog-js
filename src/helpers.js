function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000;
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const days = Math.round(minutes / 1440);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, "Today");
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday");
  }

  return `${days} days ago`;
}

export const textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id mi a mauris sodales consequat a vel libero. Sed convallis diam id lacus auctor, vestibulum condimentum sapien varius. Praesent convallis libero ultricies, pharetra metus eu, auctor sem. Morbi rutrum auctor dui ac convallis. Maecenas elementum, est eu interdum dapibus, velit mi tempor ante, id feugiat massa leo in velit. Vivamus ullamcorper felis ut enim lacinia, ac finibus erat dignissim. Morbi dapibus dolor sed nisi eleifend sagittis. Vestibulum quam lacus, vestibulum at viverra nec, auctor in ex. Aenean faucibus, velit ac mollis fermentum, nulla nisi vehicula dui, eget aliquet est erat quis nulla. Curabitur vitae augue ex. In hac habitasse platea dictumst. Quisque non purus commodo, ultrices est dapibus, scelerisque nulla. Phasellus sagittis tincidunt ante, non ultrices nisl. Nunc volutpat, lectus ultricies pellentesque ullamcorper, lectus tortor posuere lorem, ut scelerisque odio nulla suscipit tortor.

Morbi iaculis eros nec ex eleifend, vitae tincidunt nisi placerat. Proin semper, elit eu placerat bibendum, ipsum neque congue purus, sed vestibulum tortor massa nec tortor. Nunc quis congue sem. Aenean sollicitudin auctor est sit amet scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel nisi et nisi aliquam congue. Nullam fermentum laoreet nisi, in aliquet arcu mattis nec. Pellentesque cursus metus aliquam dui molestie, varius pretium neque commodo. Donec odio odio, rhoncus at orci sed, consectetur pulvinar libero. Duis aliquam faucibus odio, ac porta nisl rhoncus in.

Nunc pellentesque ut metus euismod dictum. Aenean egestas augue sit amet est pellentesque, sit amet auctor velit pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam in faucibus velit, eu efficitur sem. Phasellus ornare facilisis diam, nec iaculis turpis convallis eu. Curabitur lobortis tincidunt ultricies. Praesent sed purus sem. Donec fermentum interdum sodales. Quisque auctor neque sem, et tempor sapien placerat sed. Etiam a massa nunc.

Quisque et placerat eros. Sed non interdum massa. Nulla cursus quam non diam sodales, non lacinia mauris consectetur. Nunc et velit in nunc convallis dignissim. Vivamus vel urna eu ex finibus laoreet aliquam eget lorem. Aenean eget euismod mauris, id tempor mauris. Aenean nec lacus posuere, volutpat dolor quis, porta elit.

Fusce id enim pretium odio rhoncus molestie laoreet in ex. Nunc a felis quam. Etiam nulla libero, viverra quis mattis et, bibendum nec eros. Nullam congue, nibh in mattis rhoncus, odio odio mollis erat, id tempor est purus ac leo. Ut at neque felis. Morbi egestas lobortis purus, vel hendrerit arcu dapibus nec. Nunc mi velit, interdum a orci sit amet, pellentesque semper turpis.`;

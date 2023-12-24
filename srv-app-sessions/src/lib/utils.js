import Fuse from "fuse.js";

export function fuzzySearch(list, field, query) {
  const options = {
    includeScore: true,
    keys: [field],
  };

  const fuse = new Fuse(list, options);
  const result = fuse.search(query);

  return result.filter((item) => item.score < 0.4).slice(0, 3);
}

export function getBrowserName(userAgent) {
  // Convert user agent string to lowercase for case-insensitive matching
  const userAgentLowerCase = userAgent.toLowerCase();

  // Check for common browsers
  if (userAgentLowerCase.includes("chrome")) {
    return "Google Chrome";
  } else if (userAgentLowerCase.includes("firefox")) {
    return "Mozilla Firefox";
  } else if (
    userAgentLowerCase.includes("safari") &&
    !userAgentLowerCase.includes("chrome")
  ) {
    return "Apple Safari";
  } else if (userAgentLowerCase.includes("edge")) {
    return "Microsoft Edge";
  } else if (
    userAgentLowerCase.includes("opera") ||
    userAgentLowerCase.includes("opr")
  ) {
    return "Opera";
  } else if (
    userAgentLowerCase.includes("msie") ||
    userAgentLowerCase.includes("trident")
  ) {
    return "Internet Explorer";
  } else {
    return "Unknown Browser";
  }
}
export function getOsName(userAgent) {
  // Convert user agent string to lowercase for case-insensitive matching
  const userAgentLowerCase = userAgent.toLowerCase();

  // Check for common OSes
  if (userAgentLowerCase.includes("windows")) {
    return "Windows";
  } else if (userAgentLowerCase.includes("linux")) {
    return "Linux";
  } else if (userAgentLowerCase.includes("macintosh")) {
    return "MacOS";
  } else if (userAgentLowerCase.includes("iphone")) {
    return "iPhone";
  } else if (userAgentLowerCase.includes("ipad")) {
    return "iPad";
  } else if (userAgentLowerCase.includes("ipod")) {
    return "iPod";
  } else if (userAgentLowerCase.includes("android")) {
    return "Android";
  } else {
    return "Unknown OS";
  }
}
export function getDeviceType(userAgent) {
  // Convert user agent string to lowercase for case-insensitive matching
  const userAgentLowerCase = userAgent.toLowerCase();

  // Check for common device types
  if (userAgentLowerCase.includes("mobile")) {
    return "Mobile";
  } else if (userAgentLowerCase.includes("tablet")) {
    return "Tablet";
  } else if (userAgentLowerCase.includes("tv")) {
    return "TV";
  } else {
    return "Desktop";
  }
}

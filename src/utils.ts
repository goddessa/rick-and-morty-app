import { AxiosError } from 'axios';

function isTouchDevice(): boolean {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function (query: string) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || 'DocumentTouch' in window) {
    return true;
  }

  const query = ['(', prefixes.join('touch-enabled),('), 'ncoded', ')'].join('');
  return mq(query);
}

export const parseStringValue = (value: any) =>
  /^\d+$/.test(value)
    ? +value
    : /^(true|false)$/.test(value)
    ? JSON.parse(value)
    : value;

export function convertFormDataToJSONObject(formData: FormData) {
  const obj: any = {};
  formData.forEach((val, key) => {
    const isArray = key.includes('[]') || key.includes('files');

    if (isArray) {
      const newKey = key.split('[]')[0];
      if (!obj[newKey]) obj[newKey] = [];
      obj[newKey].push(parseStringValue(val));
    } else {
      obj[key] = parseStringValue(val);
    }
  });
  return obj;
}

export const convertObjToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  path = '',
) => {
  if (obj === undefined) return;

  for (const prop in obj) {
    const newPath = path ? `${path}[${prop}]` : prop;
    if (typeof obj[prop] !== 'object') {
      if (obj[prop] instanceof File) {
        const file: File = obj[prop];
        formData.append(newPath, file, file.name);
      } else {
        formData.append(newPath, obj[prop]);
      }
    } else if (obj[prop] === null) {
      formData.append(newPath, obj[prop]);
    } else {
      convertObjToFormData(obj[prop], formData, newPath);
    }
  }

  return formData;
};

export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  isImmediate = false,
) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (...args: any[]) {
    const later = () => {
      timeout = null;
      if (!isImmediate) {
        func(...args);
      }
    };

    const callNow = isImmediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func(...args);
    }
  };
}

const isAxiosError = (e: AxiosError | unknown): e is AxiosError =>
  'message' in (e as AxiosError) || 'response' in (e as AxiosError);

function toastError(e: AxiosError | unknown) {
  if (isAxiosError(e)) {
    const message =
      e.response?.data && typeof e.response.data === 'object'
        ? (e.response.data as any)?.message
        : e.message;

    console.error({ text: message || 'Unknown error' });
    return;
  }

  console.error({ text: 'Error' });
}

export const isNonEmptyString = (value: any) => {
  return value.trim().length > 0;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): any {}

export default {
  noop,
  toastError,
  isTouchDevice,
  parseStringValue,
  convertObjToFormData,
  convertFormDataToJSONObject,
  debounce,
  isNonEmptyString,
};

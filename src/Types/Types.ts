export type Lang = 'en' | 'ru';

export interface FormDataItem {
  key: string;
  value: string;
}

export type BodyValue = null | string | FormData;

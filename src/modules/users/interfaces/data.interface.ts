export interface iData<T> {
  message: string;
  code: number | string;
  data?: T;
}

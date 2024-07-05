export type subResponseDataType = string;

export type subResponsType = {
  statusCode: number;
  value: subResponseDataType[];
  error: boolean;
  message: string;
};

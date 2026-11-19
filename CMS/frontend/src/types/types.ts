export type ApiResponse<T> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message?: string;
      data?: never;
    };

export type ModifiedArray = {
  id: string;
  name: string;
};

import { stringUpperCase, stringWordCase } from "./utils";

type InputType = "text" | "email" | "password" | "number" | "date";

export interface INPUTS {
  name: string;
  type: InputType;
  label: string;
  maxLength?: number;
  formart?: (name: string) => string;
}

export interface SELECTS<T> {
  header: string;
  idKey: string;
  nameKey: string;
  data?: T[];
}

type FormInput = {
  name: "input";
  data: INPUTS;
};

type FormSelect<T> = {
  name: "select";
  data: SELECTS<T>;
};

export type FormField = FormInput | FormSelect<any>;

//new employee role inputs

export const NewEmployeeRoleINputs: FormField[] = [
  {
    name: "input",
    data: {
      name: "role_name",
      type: "text",
      label: "role name ",
      formart: stringWordCase,
    },
  },
  {
    name: "input",
    data: {
      name: "role_description",
      type: "text",
      label: "role description ",
      formart: stringWordCase,
    },
  },
];

export const NewAccountRoleINputs: FormField[] = [
  {
    name: "input",
    data: {
      name: "role_name",
      type: "text",
      label: "account role name ",
      formart: stringWordCase,
    },
  },
];

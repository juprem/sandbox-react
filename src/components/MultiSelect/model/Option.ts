export interface Option {
  value: OptionValue;
  label: string;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type SelectOption = Option | OptionGroup;

export type OptionValue = string | number
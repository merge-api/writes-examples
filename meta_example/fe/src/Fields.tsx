import { EnumInformation } from "./types";


type FieldProps<T extends string | number | boolean> =  {
  label: string; 
  value: T;
  onChange: (val: T) => void;
}

export const TextField = ({ label, value, onChange }: FieldProps<string>) => {
  return      <label>
      {label}
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</label>;
};

export const DropdownField = ({ enumInformation, label, value, onChange }: FieldProps<string> & {enumInformation: EnumInformation}) => {
  return      <label>
      {label}
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</label>;
};

export const NumberField = ({ label, value, onChange }: FieldProps<number>) => {
  return      <label>
      {label}
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</label>;
};


export const CheckboxField = ({ label, value, onChange }: FieldProps<boolean>) => {
  return      <label>
      {label}
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
</label>;
};
import { EnumInformation } from "./types";

type FieldProps<T extends string | number | boolean> = {
  label: string;
  value: T | undefined;
  onChange: (val: T) => void;
};

export const TextField = ({ label, value, onChange }: FieldProps<string>) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export const DropdownField = ({
  enumInformation,
  label,
  value,
  onChange,
}: FieldProps<string> & { enumInformation: EnumInformation }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {enumInformation.map((templateIDOption) => (
          <option value={templateIDOption.value}>
            {templateIDOption.description}
          </option>
        ))}
      </select>
    </label>
  );
};

export const NumberField = ({ label, value, onChange }: FieldProps<string>) => {
  return (
    <label>
      {label}
      <input
        type="text"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export const CheckboxField = ({
  label,
  value,
  onChange,
}: FieldProps<boolean>) => {
  return (
    <label>
      {label}
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

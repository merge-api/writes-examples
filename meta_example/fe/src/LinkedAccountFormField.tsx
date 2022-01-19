import { NumberField, CheckboxField, DropdownField, TextField } from "./Fields";
import { JSONSchemaNonNestedValue } from "./types";

type Props = {
  currentValue: unknown;
  onChange: (val: unknown) => void;
  fieldKey: string;
  fieldSchema: JSONSchemaNonNestedValue;
};

const LinkedAccountFormField = ({
  fieldKey,
  fieldSchema,
  currentValue,
  onChange,
}: Props) => {
  const fieldType = fieldSchema.type;
  const enumInformation = fieldSchema.enum_information;

  switch (fieldType) {
    case "number":
      return (
        <NumberField
          label={fieldKey}
          value={currentValue as string}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <CheckboxField
          label={fieldKey}
          value={currentValue as boolean}
          onChange={onChange}
        />
      );
    default:
      if (enumInformation) {
        return (
          <DropdownField
            enumInformation={enumInformation}
            label={fieldKey}
            value={currentValue as string}
            onChange={onChange}
          />
        );
      } else {
        return (
          <TextField
            label={fieldKey}
            value={currentValue as string}
            onChange={onChange}
          />
        );
      }
  }
};

export default LinkedAccountFormField;

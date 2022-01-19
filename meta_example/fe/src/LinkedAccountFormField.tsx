import { NumberField, CheckboxField, DropdownField, TextField } from "./Fields";
import { JSONSchemaNonNestedValue } from "./types";

type Props = {
    currentValue: unknown;
    onChange: (val: unknown) => void;
    fieldKey: string;
    fieldSchema: JSONSchemaNonNestedValue;
}

const LinkedAccountFormField = ({fieldKey, fieldSchema, currentValue, onChange}: Props) => {
    const fieldType = fieldSchema.type;
    const enumInformation = fieldSchema.enum_information;

    switch (fieldType) {
        case "number": 
            return <NumberField label={fieldKey} value={currentValue} onChange={onChange}/>;
        case "boolean":
            return <CheckboxField label={fieldKey} value={currentValue} onChange={onChange}/>;
        default:
            if (enumInformation) { 
                return <DropdownField label={fieldKey} value={currentValue} onChange={onChange}/>;
            } else {
                return <TextField label={fieldKey} value={currentValue} onChange={onChange}/>;
            }
    }
}

export default LinkedAccountFormField;
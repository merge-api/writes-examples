import LinkedAccountFormField from "./LinkedAccountFormField";
import {EnumInformation, JSONObjectSchemaProperties, JSONSchemaNonNestedValue } from "./types";

type Props = {
    applicationTemplateIDOptions: EnumInformation | undefined;
    selectedApplicationTemplateID: string | undefined;
    setSelectedApplicationTemplateID: (templateID: string | undefined) => void;
    hasConditionalFields: boolean;
    candidateLinkedAccountParamSchema: JSONObjectSchemaProperties;
    applicationLinkedAccountParamSchema: JSONObjectSchemaProperties;
    setModelField: (fieldKey: string, fieldValue: unknown) => void;
  };
  
  const LinkedAccountFormFields = ({
    applicationTemplateIDOptions,
    selectedApplicationTemplateID,
    setSelectedApplicationTemplateID,
    hasConditionalFields,
    candidateLinkedAccountParamSchema,
    applicationLinkedAccountParamSchema,
  }: Props) => {
    return (
      <>
        {applicationTemplateIDOptions && (
          <select value={selectedApplicationTemplateID} onChange={e => setSelectedApplicationTemplateID(e.target.value)}>
            {applicationTemplateIDOptions.map(templateIDOption => (
              <option value={templateIDOption.value}>{templateIDOption.description}</option>
            ))}
          </select>
        )}
        {!hasConditionalFields && 
        <>
          {Object.entries(candidateLinkedAccountParamSchema).map(([k, v]) => (
            <LinkedAccountFormField fieldKey={k} fieldSchema={v as JSONSchemaNonNestedValue} currentValue={} onChange={} />
          ))}
  
          {Object.entries(applicationLinkedAccountParamSchema).map(([k, v]) => (
            <LinkedAccountFormField fieldKey={k} fieldSchema={v as JSONSchemaNonNestedValue} currentValue={} onChange={}  />
          ))}
          </>
          }
      </>
    );
  };

export default LinkedAccountFormFields;
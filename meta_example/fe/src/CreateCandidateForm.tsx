import { useCallback, useEffect, useState } from "react";
import { DropdownField, TextField } from "./Fields";
import LinkedAccountFormField from "./LinkedAccountFormField";
import {
  CandidateRequestData,
  JSONArraySchema,
  JSONObjectSchema,
  JSONSchemaNonNestedValue,
  MetaResponse,
} from "./types";
import { createCandidate, fetchMeta } from "./utils";

const CreateCandidateForm = () => {
  const [metaResponse, setMetaResponse] = useState<MetaResponse>();
  const [requestData, setRequestData] = useState<Partial<CandidateRequestData>>(
    {
      model: {
        first_name: "",
        last_name: "",
        applications: [
          {
            remote_template_id: undefined,
            linked_account_params: {},
          },
        ],
        linked_account_params: {},
      },
    }
  );

  const selectedApplicationTemplateID =
    requestData?.model?.applications?.[0]?.remote_template_id;

  useEffect(() => {
    fetchMeta(selectedApplicationTemplateID, setMetaResponse);
  }, [selectedApplicationTemplateID]);

  const onCreateCandidate = useCallback(() => {
    createCandidate(requestData);
  }, [requestData]);
  if (!metaResponse) {
    return <div>Loading...</div>;
  }

  const hasConditionalFields = metaResponse.has_conditional_fields;
  const hasRequiredLinkedAccountParams =
    metaResponse.has_required_linked_account_params;
  const shouldShowLinkedAccountParams =
    hasRequiredLinkedAccountParams && !hasConditionalFields;

  const modelProperties = (metaResponse.request_schema.properties
    .model as JSONObjectSchema).properties;
  const candidateLinkedAccountParamSchema = (modelProperties.linked_account_params as JSONObjectSchema)
    .properties;
  const applicationProperties = ((modelProperties.applications as JSONArraySchema)
    .items as JSONObjectSchema).properties;
  const applicationLinkedAccountParamSchema = (applicationProperties.linked_account_params as JSONObjectSchema)
    .properties;
  const applicationTemplateIDOptions =
    applicationProperties.remote_template_id?.enum_information;

  const model = requestData.model;
  const application = model?.applications?.[0];

  const setField = (fieldKey: string, fieldValue: unknown) =>
    setRequestData({ ...requestData, [fieldKey]: fieldValue });
  const setModelField = (fieldKey: string, fieldValue: unknown) => {
    setField("model", { ...model, [fieldKey]: fieldValue });
  };
  const setCandidateLinkedAccountParam = (
    fieldKey: string,
    fieldValue: unknown
  ) => {
    setModelField("linked_account_params", {
      ...(model?.linked_account_params ?? {}),
      [fieldKey]: fieldValue,
    });
  };
  const setApplicationField = (fieldKey: string, fieldValue: unknown) => {
    setModelField("applications", { ...application, [fieldKey]: fieldValue });
  };
  const setApplicationLinkedAccountParam = (
    fieldKey: string,
    fieldValue: unknown
  ) => {
    setApplicationField("linked_account_params", {
      ...(application?.linked_account_params ?? {}),
      [fieldKey]: fieldValue,
    });
  };

  return (
    <form onSubmit={onCreateCandidate}>
      {
        // logic to support fixed candidate fields (first_name, last_name, etc.)
      }
      <TextField
        label="First Name"
        value={requestData.model?.first_name ?? ""}
        onChange={(v: string) => setModelField("first_name", v)}
      />
      <TextField
        label="Last Name"
        value={requestData.model?.last_name ?? ""}
        onChange={(v: string) => setModelField("last_name", v)}
      />
      {
        // logic to handle application template ID if needed
      }
      {applicationTemplateIDOptions && (
        <DropdownField
          enumInformation={applicationTemplateIDOptions}
          label="Remote Template ID"
          value={selectedApplicationTemplateID}
          onChange={(v) => setApplicationField("remote_template_id", v)}
        />
      )}
      {
        // logic to handle linked-account-level fields if needed
      }
      {shouldShowLinkedAccountParams && (
        <>
          {Object.entries(candidateLinkedAccountParamSchema).map(([k, v]) => (
            <LinkedAccountFormField
              fieldKey={k}
              fieldSchema={v as JSONSchemaNonNestedValue}
              currentValue={requestData.model?.linked_account_params?.[k]}
              onChange={(v: unknown) => setCandidateLinkedAccountParam(k, v)}
            />
          ))}
          {Object.entries(applicationLinkedAccountParamSchema).map(([k, v]) => (
            <LinkedAccountFormField
              fieldKey={k}
              fieldSchema={v as JSONSchemaNonNestedValue}
              currentValue={
                requestData.model?.applications?.[0]?.linked_account_params?.[k]
              }
              onChange={(v: unknown) => setApplicationLinkedAccountParam(k, v)}
            />
          ))}
        </>
      )}
    </form>
  );
};

export default CreateCandidateForm;

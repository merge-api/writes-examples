import { useCallback, useEffect, useState } from "react";
import { TextField } from "./Fields";
import LinkedAccountFormFields from "./LinkedAccountFormFields";
import { CandidateRequestData, JSONArraySchema, JSONObjectSchema, MetaResponse } from "./types";
import { createCandidate, fetchMeta } from "./utils";

const CreateCandidateForm = () => {
  const [selectedApplicationTemplateID, setSelectedApplicationTemplateID] = useState<string>();
  const [metaResponse, setMetaResponse] = useState<MetaResponse>();
  const [requestData, setRequestData] = useState<Partial<CandidateRequestData>>({});

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
  const hasRequiredLinkedAccountParams = metaResponse.has_required_linked_account_params;
  const modelProperties = (metaResponse.request_schema.properties.model as JSONObjectSchema).properties;
  const candidateLinkedAccountParamSchema = (modelProperties.linked_account_params as JSONObjectSchema).properties;
  const applicationProperties = ((modelProperties.applications as JSONArraySchema).items as JSONObjectSchema).properties;  
  const applicationLinkedAccountParamSchema = (applicationProperties.linked_account_params as JSONObjectSchema).properties;
  const applicationTemplateIDOptions = applicationProperties.remote_template_id?.enum_information;

  const setField = (fieldKey: string, fieldValue: unknown) => setRequestData({...requestData, [fieldKey]: fieldValue});
  const setModelField = (fieldKey: string, fieldValue: unknown) => {
    setField("model", {...requestData.model, [fieldKey]: fieldValue});
  }

  return (
    <form onSubmit={onCreateCandidate}>
      {
        // Fixed logic to support candidate fields (first_name, last_name, etc.)
        <>
        <TextField label="First Name" value={requestData.model?.first_name ?? ""} onChange={(v: string) => setModelField("first_name", v)}/>
        <TextField label="Last Name" value={requestData.model?.last_name ?? ""} onChange={(v: string) => setModelField("last_name", v)}/>
        </>
      }
      {hasRequiredLinkedAccountParams && (
        <LinkedAccountFormFields
          applicationTemplateIDOptions={applicationTemplateIDOptions}
          selectedApplicationTemplateID={selectedApplicationTemplateID}
          setSelectedApplicationTemplateID={setSelectedApplicationTemplateID}
          hasConditionalFields={hasConditionalFields}
          candidateLinkedAccountParamSchema={candidateLinkedAccountParamSchema}
          applicationLinkedAccountParamSchema={applicationLinkedAccountParamSchema}
          setModelField={setModelField}
        />
      )}
    </form>
  );
};

export default CreateCandidateForm;

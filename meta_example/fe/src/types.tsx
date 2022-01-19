export type EnumInformation = {
  value: string;
  description: string;
}[];

export type JSONObjectSchemaProperties = {
  [parameter: string]: JSONSchemaValue;
};

export type JSONObjectSchema = {
  title?: string;
  type: "object";
  properties: JSONObjectSchemaProperties;
  description?: string;
  enum_information?: EnumInformation;
};

export type JSONArraySchema = {
  title?: string;
  type: "array";
  items: JSONSchemaValue;
  description?: string;
  enum_information?: EnumInformation;
};

export type JSONSchemaNonNestedValue = {
  title?: string;
  type: "number" | "string" | "boolean";
  description?: string;
  enum_information?: EnumInformation;
};

export type JSONSchemaValue =
  | JSONObjectSchema
  | JSONArraySchema
  | JSONSchemaNonNestedValue;

export type MetaResponse = {
  request_schema: JSONObjectSchema;
  has_conditional_fields: boolean;
  has_required_linked_account_params: boolean;
};

export type CandidateRequestData = {
  model: {
    first_name: string;
    last_name: string;
    applications: {
      remote_template_id: string | undefined;
      linked_account_params: undefined | Record<string, unknown>;
    }[];
    linked_account_params: undefined | Record<string, unknown>;
  };
};

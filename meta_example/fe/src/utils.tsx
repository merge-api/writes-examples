import { CandidateRequestData, MetaResponse } from "./types";

export const fetchMeta = (
  applicationTemplateID: string | undefined,
  onResponse: (metaResponse: MetaResponse) => void
): void => {
  fetch("/get_candidate_meta", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ applicationTemplateID }),
  })
    .then((response) => response.json())
    .then((data: MetaResponse) => onResponse(data));
};

export const createCandidate = (
  requestData: Partial<CandidateRequestData>
): void => {
  fetch("/create_candidate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  }).then((response) => response.json());
};

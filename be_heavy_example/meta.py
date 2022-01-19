import MergeATSClient
from MergeATSClient.api import candidates_api
from MergeATSClient.model.candidate_endpoint_request import CandidateEndpointRequest
from MergeATSClient.model.candidate_request import CandidateRequest
from MergeATSClient.model.application_request import ApplicationRequest
configuration = MergeATSClient.Configuration()
configuration.api_key['tokenAuth'] = 'API_KEY'
configuration.api_key_prefix['tokenAuth'] = 'Bearer'
api_client = MergeATSClient.ApiClient(configuration)
api_instance = candidates_api.CandidatesApi(api_client)
x_account_token = 'LINKED_ACCOUNT_TOKEN'

def send_template_ids_to_frontend_and_wait_for_selection(application_template_ids):
    return application_template_ids[0].get("id")


def generate_form_and_get_end_user_params_from_schema(
    candidate_linked_account_param_schema, application_linked_account_param_schema
):
    return None, None


def create_candidate_with_meta(x_account_token):
    meta_response = api_instance.candidates_post_meta_retrieve(x_account_token)
    selected_application_template_id = None

    if meta_response.has_conditional_fields:
        application_template_ids = (
            meta_response.request_schema.get("properties")
            .get("model")
            .get("properties")
            .get("applications")
            .get("items")
            .get("properties")
            .get("remote_template_id")
            .get("enum_information")
        )
        selected_application_template_id = send_template_ids_to_frontend_and_wait_for_selection(
            application_template_ids
        )
        meta_response = api_instance.candidates_post_meta_retrieve(
            x_account_token, application_template_id=selected_application_template_id
        )

    model_properties = meta_response.request_schema.get("properties").get("model").get("properties")
    candidate_linked_account_param_schema = model_properties.get("linked_account_params")
    application_linked_account_param_schema = (
        model_properties.get("applications").get("items").get("properties").get("linked_account_params")
    )

    (
        candidate_linked_account_params,
        application_linked_account_params,
    ) = generate_form_and_get_end_user_params_from_schema(
        candidate_linked_account_param_schema, application_linked_account_param_schema
    )

    candidate_endpoint_request = CandidateEndpointRequest(
        remote_user_id="",
        model=CandidateRequest(
            first_name="Henry",
            last_name="Baer",
            applications=[
                ApplicationRequest(
                    linked_account_params=application_linked_account_params,
                    remote_template_id=selected_application_template_id,
                )
            ],
            linked_account_params=candidate_linked_account_params,
        ),
    )

    api_response = api_instance.candidates_create(x_account_token, candidate_endpoint_request)


create_candidate_with_meta(x_account_token)

import apiClient from "./apiClient";
import { generateSecretHash } from "../utils/cognitoSecretHash";

const COGNITO_ENDPOINT = "https://cognito-idp.us-east-1.amazonaws.com/";
const CLIENT_ID = "r721bqprtleru5hmvbrferhfl";
const CLIENT_SECRET = "1iuo3nbvahvjk8garnu8oqa9pbin7v5chk9frv37qn907t9910n8";

export default async function cognitoLogin(username, password) {
  const SECRET_HASH = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const payload = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: SECRET_HASH,
    },
  };

  return await apiClient.post(COGNITO_ENDPOINT, payload, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
      "Content-Type": "application/x-amz-json-1.1",
    },
  });
}

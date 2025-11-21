import apiClient from "./apiClient";
import { generateSecretHash } from "../utils/cognitoSecretHash";
 
// Read from environment variables
const API_URL = import.meta.env.VITE_API_URL;
const COGNITO_ENDPOINT = import.meta.env.VITE_COGNITO_ENDPOINT;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_COGNITO_CLIENT_SECRET;

// -------------------------------------------------------
// LOGIN (InitiateAuth)
// -------------------------------------------------------
export async function cognitoLogin(username, password) {
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

// -------------------------------------------------------
// SIGN UP
// -------------------------------------------------------
export async function cognitoSignUp(name, username, password, email) {
  const SECRET_HASH = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const payload = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    SecretHash: SECRET_HASH,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: name }, // <- required by Cognito

    ],
  };

  return await apiClient.post(COGNITO_ENDPOINT, payload, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
      "Content-Type": "application/x-amz-json-1.1",
    },
  });
}

// -------------------------------------------------------
// CONFIRM SIGNUP (OTP)
// -------------------------------------------------------
export async function cognitoConfirmSignUp(username, code) {
  const SECRET_HASH = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const payload = {
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
    SecretHash: SECRET_HASH,
  };

  return await apiClient.post(COGNITO_ENDPOINT, payload, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp",
      "Content-Type": "application/x-amz-json-1.1",
    },
  });
}

// -------------------------------------------------------
// Forgot password
// -------------------------------------------------------
export async function cognitoForgotPassword(username) {
  const SECRET_HASH = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const payload = {
    ClientId: CLIENT_ID,
    Username: username,
    SecretHash: SECRET_HASH,
  };

  return await apiClient.post(COGNITO_ENDPOINT, payload, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword",
      "Content-Type": "application/x-amz-json-1.1",
    },
  });
}

// -------------------------------------------------------
// CONFIRM forgot password
// -------------------------------------------------------
export async function cognitoConfirmForgotPassword(username, code, newPassword) {
  const SECRET_HASH = generateSecretHash(username, CLIENT_ID, CLIENT_SECRET);

  const payload = {
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
    SecretHash: SECRET_HASH,
  };

  return await apiClient.post(COGNITO_ENDPOINT, payload, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword",
      "Content-Type": "application/x-amz-json-1.1",
    },
  });
}


export function mockLoginAPI(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username, token: "mock-token-123" });
    }, 500);
  });
}

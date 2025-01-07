export function authRequest(url: string) {
  const accessToken = localStorage.getItem('contabilium_access_token');

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`, // Pass the token as Bearer token
      'Content-Type': 'application/json', // Set content type to JSON if needed
    },
  });
}

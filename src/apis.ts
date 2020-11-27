export const verifyCodeRequest = async (code: string) => {
  const response = await fetch('/verifycode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({code}),
  });
  const json = await response.json();
  if(response.status >= 400) {
    throw Error(json.message);
  }
  return json;
}
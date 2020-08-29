// api request function
import { stringifyUrl } from 'query-string';
const apiUrlRoot = '/api';

const apiRequest = (path, params = {}) => {
  const { method, data, query } = params;
  return fetch(
    stringifyUrl({
      url: `${apiUrlRoot}/${path}`,
      query: query,
    }),
    {
      method: (method || 'get').toUpperCase(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => err);
};

export default apiRequest;

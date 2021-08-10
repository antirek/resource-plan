import axios from 'axios';
import resource from 'resource-axios';
// import store from './store';

function getBaseUrl() {
  return (window.baseUrl && window.baseUrl !== '{{baseUrl}}') ? window.baseUrl : 'http://localhost:3000';
}

// const baseUrl = 'http://localhost:3000';

axios.interceptors.request.use((config) => {
  const { token } = 123;// store.getters;
  config.headers['API-Token'] = token;
  return config;
});

const Landing = resource(`${getBaseUrl()}/profile`, axios); // const Landing = resource(`${baseUrl}/profile`, axios);

export { Landing };

const apiCall = {
  get: async (url) => {
    const reqUrl = getBaseUrl() + url;
    // const { token } = store.getters;
    console.log('url', url, reqUrl);
    const result = await axios.get(reqUrl, {
      headers: {
        // 'API-Token': token,
      },
    });
    return result;
  },
  post: async (url, data) => {
    const reqUrl = getBaseUrl() + url;
    // const { token } = store.getters;
    const result = await axios.post(reqUrl, data, {
      headers: {
        // 'API-Token': token,
      },
    });
    return result;
  },
  delete: async (url) => {
    const reqUrl = getBaseUrl() + url;
    // const { token } = store.getters;
    console.log('url', url, reqUrl);
    const result = await axios.delete(reqUrl, {
      headers: {
        // 'API-Token': token,
      },
    });
    return result;
  },
};

export default apiCall;

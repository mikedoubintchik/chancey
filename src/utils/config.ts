// env.js
export const parseEnvBool = (value: any) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    // handle other cases as you see fit, possibly throw an error
    return value;
  }
};

const config = {
  FEATURE_WALKTHROUGH: parseEnvBool(process.env.REACT_APP_FEATURE_WALKTHROUGH),
  FEATURE_WELCOME: parseEnvBool(process.env.REACT_APP_FEATURE_WELCOME),
  FEATURE_PUSH_NOTIFICATIONS: parseEnvBool(process.env.REACT_APP_FEATURE_PUSH_NOTIFICATIONS),
  FEATURE_AUTHENTICATION: parseEnvBool(process.env.REACT_APP_FEATURE_AUTHENTICATION),
  FEATURE_READ_TICKET: parseEnvBool(process.env.REACT_APP_FEATURE_READ_TICKET),
  USE_MOCK_STORE: parseEnvBool(process.env.REACT_APP_USE_MOCK_STORE),
};

console.log('ACTIVE FEATURES: ', config);

export default config;

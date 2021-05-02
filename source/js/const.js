export const EMAIL_REG_EXP = /^(?:[-a-z\d\+\*\/\?!{}`~_%&`=^$#]+(?:\.[-a-z\d\+\*\/\?!{}`~_%&`=^$#]+)*)@(?:[-a-z\d_]+\.){1,60}[a-z]{2,6}$/;
export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};
export const URL = `https://jsonplaceholder.typicode.com/posts`;
export const SHOW_TIME = 5000;

export const ErrorDescription = {
  DEFAULT: `Data specified incorrectly`,
  EMAIL: `Use valid email format: pasha96@email.com`,
  SUBMIT: `An error occurred while sending data. Try submitting again or refresh the page.`
};

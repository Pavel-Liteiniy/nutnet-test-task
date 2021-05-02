import {SHOW_TIME, ErrorDescription} from './const.js'

export const toast = ( message, toastContainer ) => {
  const toastElement = document.createElement( `div` );
  toastElement.textContent = message;
  toastElement.classList.add( `toast__item` );

  toastContainer.append( toastElement );

  setTimeout( () => {
    toastElement.remove();
  }, SHOW_TIME );
};

export const checkValidity = ( { value }, regExp, errorDescription = ErrorDescription.DEFAULT, isRequired = true ) => {
  if ( value.length === 0 && isRequired ) {
    return {
      isInvalid: true,
      description: `Required field`,
    };
  }

  if ( value.length === 0 && !isRequired ) {
    return {
      isInvalid: false,
      description: `Valid`,
    };
  }

  if ( regExp.test( value ) ) {
    return {
      isInvalid: false,
      description: `Valid`,
    };
  } else {
    return {
      isInvalid: true,
      description: errorDescription,
    };
  }
};

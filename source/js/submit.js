'use strict';

const EMAIL_REG_EXP = /^(?:[-a-z\d\+\*\/\?!{}`~_%&`=^$#]+(?:\.[-a-z\d\+\*\/\?!{}`~_%&`=^$#]+)*)@(?:[-a-z\d_]+\.){1,60}[a-z]{2,6}$/;
const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};
const URL = `https://jsonplaceholder.typicode.com/posts`;
const SHOW_TIME = 5000;

const ErrorDescription = {
  DEFAULT: `Data specified incorrectly`,
  EMAIL: `Use valid email format: pasha96@email.com`,
  SUBMIT: `An error occurred while sending data. Try submitting again or refresh the page.`
};

const wrapperElement = document.querySelector( `.submit__wrapper` );
const formElement = wrapperElement.querySelector( `.submit__form` );
const inputNameElement = formElement.querySelector( `#submit-name` );
const inputEmailElement = formElement.querySelector( `#submit-email` );
const inputSubjetElement = formElement.querySelector( `#submit-subjet` );
const inputMessageElement = formElement.querySelector( `#submit-message` );
const buttonElement = formElement.querySelector( `.submit__button` );

const toast = ( message ) => {
  const toastElement = document.createElement( `div` );
  toastElement.textContent = message;
  toastElement.classList.add( `toast__item` );

  toastContainer.append( toastElement );

  setTimeout( () => {
    toastElement.remove();
  }, SHOW_TIME );
};

const renderValidationHint = ( targetElement, { isInvalid, description }, position = `afterend` ) => {
  if ( !isInvalid && targetElement.nextElementSibling.classList.contains( `submit__validation-hint` ) ) {
    targetElement.nextElementSibling.remove();
    return;
  }

  if ( isInvalid && targetElement.nextElementSibling.classList.contains( `submit__validation-hint` ) ) {
    targetElement.nextElementSibling.remove();
    targetElement.insertAdjacentHTML( position, `<p class="submit__validation-hint">${description}</p>` );
    return;
  }

  if ( isInvalid && !targetElement.nextElementSibling.classList.contains( `submit__validation-hint` ) ) {
    targetElement.insertAdjacentHTML( position, `<p class="submit__validation-hint">${description}</p>` );
  }
};

const checkValidity = ( { value }, regExp, errorDescription = ErrorDescription.DEFAULT, isRequired = true ) => {
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

const setElementValidityMarker = ( targetElement, { isInvalid } ) => {
  if ( isInvalid ) {
    targetElement.classList.add( `submit__input--invalid` );
  } else {
    targetElement.classList.remove( `submit__input--invalid` );
  }
};

const inputValidationHandler = ( { target: targetElement }, regExp, errorDescription, isRequired = true ) => {
  const validation = checkValidity( targetElement, regExp, errorDescription, isRequired );

  setElementValidityMarker( targetElement, validation );
  renderValidationHint( targetElement, validation );
};

wrapperElement.style.minHeight = wrapperElement.offsetHeight + `px`;
formElement.setAttribute( `novalidate`, true );

const toastContainer = document.createElement( `div` );
toastContainer.classList.add( `toast` );
document.body.append( toastContainer );

inputEmailElement.addEventListener( `input`, ( evt ) => {
  inputValidationHandler( evt, EMAIL_REG_EXP, ErrorDescription.EMAIL );
} );

formElement.addEventListener( `submit`, ( evt ) => {
  evt.preventDefault();

  const emailValidation = checkValidity( inputEmailElement, EMAIL_REG_EXP, ErrorDescription.EMAIL );

  if ( emailValidation.isInvalid ) {
    setElementValidityMarker( inputEmailElement, emailValidation );
    renderValidationHint( inputEmailElement, emailValidation );
  }

  if ( !emailValidation.isInvalid ) {
    const formData = new FormData( evt.target );
    const data = {};

    for ( const pair of formData.entries() ) {
      data[ pair[ 0 ] ] = [ ...pair ].pop();
    }

    inputNameElement.disabled = true;
    inputEmailElement.disabled = true;
    inputSubjetElement.disabled = true;
    inputMessageElement.disabled = true;
    buttonElement.disabled = true;

    const buttonTextContentPrevious = buttonElement.textContent;
    buttonElement.textContent = `Submitting...`;

    fetch( URL, {
      method: `POST`,
      body: JSON.stringify( data ),
      headers: {
        'Content-type': `application/json; charset=UTF-8`
      }
    } )
        .then( ( response ) => {
          if (
            response.status < SuccessHTTPStatusRange.MIN ||
            response.status > SuccessHTTPStatusRange.MAX
          ) {
            throw new Error( `${response.status}: ${response.statusText}` );
          }

          wrapperElement.innerHTML = `<p class="submit__success">Thank you! We will certainly write the answer!</p>`;
        } )
        .catch( () => {
          toast( ErrorDescription.SUBMIT );

          inputNameElement.disabled = false;
          inputEmailElement.disabled = false;
          inputSubjetElement.disabled = false;
          inputMessageElement.disabled = false;
          buttonElement.disabled = false;

          buttonElement.textContent = buttonTextContentPrevious;
        } );
  }

} );

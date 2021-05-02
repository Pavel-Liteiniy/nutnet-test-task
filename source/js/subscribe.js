import { EMAIL_REG_EXP, SuccessHTTPStatusRange, URL, SHOW_TIME, ErrorDescription } from './const.js'
import { toast, checkValidity } from './utils.js'

const wrapperElement = document.querySelector( `.social__form` );
const formElement = wrapperElement;
const inputEmailElement = formElement.querySelector( `#social-email` );
const buttonElement = formElement.querySelector( `.social__button` );

const setElementValidityMarker = ( targetElement, { isInvalid } ) => {
  if ( isInvalid ) {
    targetElement.classList.add( `social__input--invalid` );
  } else {
    targetElement.classList.remove( `social__input--invalid` );
  }
};

wrapperElement.style.minHeight = wrapperElement.offsetHeight + `px`;
formElement.setAttribute( `novalidate`, true );

const toastContainer = document.createElement( `div` );
toastContainer.classList.add( `toast` );
document.body.append( toastContainer );

formElement.addEventListener( `submit`, ( evt ) => {
  evt.preventDefault();

  const emailValidation = checkValidity( inputEmailElement, EMAIL_REG_EXP, ErrorDescription.EMAIL );

  if ( emailValidation.isInvalid ) {
    setElementValidityMarker( inputEmailElement, emailValidation );

    toast( ErrorDescription.EMAIL, toastContainer );
  }

  if ( !emailValidation.isInvalid ) {
    const formData = new FormData( evt.target );
    const data = {};

    for ( const pair of formData.entries() ) {
      data[ pair[ 0 ] ] = [ ...pair ].pop();
    }

    inputEmailElement.disabled = true;
    buttonElement.disabled = true;
    buttonElement.classList.add( 'social__button--sending' )

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

        wrapperElement.innerHTML = `<p class="social__success">Thanks for subscribing!</p>`;
      } )
      .catch( () => {
        toast( ErrorDescription.SUBMIT, toastContainer );

        inputEmailElement.disabled = false;
        buttonElement.disabled = false;
        buttonElement.classList.remove( 'social__button--sending' )
      } );
  }

} );

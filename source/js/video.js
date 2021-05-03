const KeyName = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

const setPlayHandler = () => {
  let link = document.querySelector( `.video__link` );

  setupVideo( link );
}

const setupVideo = ( link ) => {
  let id = parseURL( link );

  link.addEventListener( `click`, ( evt ) => {
    evt.preventDefault();

    const container = document.createElement( `div` );
    container.classList.add( `popup` );
    const iframe = createIframe( id );

    container.innerHTML = `<div class="popup__wrapper">
                             ${iframe.outerHTML}
                             <button class="popup__button" type="button" aria-label="Close popup">
                           </div>`;

    container.querySelector( '.popup__button' ).addEventListener( 'click', onCloseButtonClick )
    document.addEventListener( 'keydown', onEscKeyDown )

    document.body.appendChild( container );
  } );
}

const onCloseButtonClick = ( evt ) => {
  evt.preventDefault();
  closePopup();
}

const onEscKeyDown = ( evt ) => {
  if ( evt.key === KeyName.ESCAPE || evt.key === KeyName.ESC ) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener( 'keydown', onEscKeyDown );
  }
}

const closePopup = () => document.querySelector( '.popup' ).remove();

const parseURL = ( link ) => {
  let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)\/*/i;
  let url = link.href;
  let match = url.match( regexp );

  return match[ 1 ];
}

const createIframe = ( id ) => {
  let iframe = document.createElement( `iframe` );

  iframe.setAttribute( `allowfullscreen`, `` );
  iframe.setAttribute( `allow`, `autoplay` );
  iframe.setAttribute( `src`, generateURL( id ) );
  iframe.classList.add( `popup__video` );

  return iframe;
}

const generateURL = ( id ) => {
  let query = `?rel=0&showinfo=0&autoplay=1`;

  return `https://www.youtube.com/embed/` + id + query;
}

setPlayHandler();

const headerWrapper = document.querySelector( '.header__wrapper' );
const headerButton = headerWrapper.querySelector( '.header__button' );
const navigation = headerWrapper.querySelector( '.navigation' );
const navigationList = headerWrapper.querySelector( '.navigation__list' );

headerWrapper.classList.add( 'header__wrapper--js' );
headerButton.classList.add( 'header__button--js' );
navigation.classList.add( 'navigation--js' );
navigationList.classList.add( 'navigation__list--js' );

headerButton.addEventListener( 'click', () => {
  if ( headerButton.classList.contains( 'header__button--sandwich' ) ) {
    headerButton.classList.remove( 'header__button--sandwich' );
    headerButton.classList.add( 'header__button--cross' );
    navigationList.classList.add( 'navigation__list--show' );
  } else if ( headerButton.classList.contains( 'header__button--cross' ) ) {
    headerButton.classList.remove( 'header__button--cross' );
    headerButton.classList.add( 'header__button--sandwich' );
    navigationList.classList.remove( 'navigation__list--show' );
  } else {
    headerButton.classList.add( 'header__button--cross' );
    navigationList.classList.add( 'navigation__list--show' );
  }
} );

const reviewData = {
  'review-1': {
    name: `Matthew McConaughey`,
    position: `Chief information officer`,
    text: `Blobfish, peamouth white croaker armoured catfish yellow jack ricefish kanyu sailfin silverside white shark. Zebra shark threadtail lenok eel-goby sea bream algae eater blackchin pomfret; loach minnow. Yellowmargin triggerfish: longnose whiptail catfish tench river loach butterflyfish paradise fish zebra loach boga viperfish sea catfish. Codlet Atlantic salmon opaleye New World rivuline channel bass emperor Rio Grande perch, trahira mudsucker tiger shark.`
  },
  'review-2': {
    name: `Woody Harrelson`,
    position: `Managing Director`,
    text: `Hoki rockling pineconefish. Yellowfin grouper jack Pacific lamprey gunnel dorab sea bass golden dojo amur pike sind danio. Mola sabertooth bristlemouth featherback: Razorback sucker. Emperor john dory burbot nibbler Asiatic glassfish, sawtooth eel Black tetra mahi-mahi pencilfish slickhead, "four-eyed fish, frilled shark," North Pacific daggertooth. Climbing perch wrasse southern grayling deepwater cardinalfish; climbing perch barbeled dragonfish slender mola. Spearfish Black swallower lookdown catfish spikefish, rocket danio mudsucker wolffish, ladyfish steelhead, algae eater staghorn sculpin fire bar danio threadtail barbel herring.`
  },
  'review-3': {
    name: `Jane Galadrie`,
    position: `CEO Tengkurep`,
    text: `This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.`
  },
  'review-4': {
    name: `Michelle Monaghan`,
    position: `Chief marketing officer`,
    text: `Cherry salmon bramble shark piranha snubnose parasitic eel Moses sole Black prickleback Spanish mackerel, dartfish brook trout; ruffe. Ghoul great white shark cowfish bonito tripod fish; cusk-eel pilot fish Pacific albacore armoured catfish sea toad silverside hatchetfish northern pearleye. Albacore spookfish arapaima blue-redstripe danio tommy ruff elephantnose fish driftfish shiner trunkfish yellow weaver tadpole fish ghost knifefish. Old World rivuline Black angelfish creek chub ide swordfish, bluntnose minnow. Tench warmouth slender barracudina alewife sea raven kelp perch dwarf loach, zebra danio chain pickerel; freshwater shark northern Stargazer. Emperor angelfish emperor bristlemouth Blenny blue-redstripe danio ghost pipefish mail-cheeked fish dogteeth tetra pike characid. Medaka largenose fish: flathead catfish wormfish, dhufish jawfish bass algae eater! Garpike long-whiskered catfish bigeye squaretail bamboo shark dealfish!`
  },
  'review-5': {
    name: `Michael Potts`,
    position: `Senior Manager`,
    text: `Reef triggerfish hatchetfish mudfish wels catfish. Eel cod. Red salmon warbonnet lamprey Celebes rainbowfish. Discus longnose whiptail catfish, goby cherry salmon lionfish trumpetfish Spanish mackerel. Atka mackerel lighthousefish southern smelt, black dragonfish slender snipe eel fierasfer ribbon eel.`
  }
};

let selectedReview = 'review-3';

const containerElement = document.querySelector( '.review__wrapper' );
const textElement = containerElement.querySelector( '.review__text' );
const authorElement = containerElement.querySelector( '.review__author' );
const linkElementList = Array.from( containerElement.querySelectorAll( '.review__item' ) );

const renderReview = ( selectedItem ) => {
  const { name, position, text } = reviewData[ selectedItem ];

  textElement.textContent = text;
  authorElement.innerHTML = `<span class="review__name">${name}</span><span class="review__position">${position}</span>`;
};

const onLinkClick = ( evt ) => {
  evt.preventDefault();

  const clickedReview = evt.currentTarget.dataset.review;

  if ( clickedReview === selectedReview ) {
    return;
  }

  selectedReview = clickedReview;

  linkElementList.forEach( item => {
    if ( item.dataset.review === selectedReview ) {
      item.classList.add( 'review__item--selected' );
    } else {
      item.classList.remove( 'review__item--selected' );
    }
  } );

  renderReview( selectedReview );
};

linkElementList.forEach( item => item.addEventListener( 'click', onLinkClick ) );

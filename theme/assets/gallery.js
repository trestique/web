var sliderFace = new Splide('.splide--face', {
  pagination: false,
  classes: {
    arrows: 'sustainable-routine-arrows',
    arrow: 'sustainable-routine-arrow',
    prev: 'sustainable-routine-arrow--prev',
    next: 'sustainable-routine-arrow--next'
  }
}).mount();

var textsFace = [
  'Super clean and creamy formula with skincare-inspired ingredients works to boost natural collagen production and lock in moisture. Our proprietary Carrot Complex protects skin from blue light damage.',
  'Take concealing to a new level with this full coverage, flexible formula that moves with your skin but stays in place all day. The radiant finish diffuses light smoothing and perfecting skin tone all over.',
  'Illuminates features with lasting, dewy light. No glitter or sparkle, just luminescent shimmer. The innovative cream-gel formula delivers a more natural, lit-from-within glow. Serious customer love.',
  'Gives skin a youthful wash of soft-focus color and a dreamy, powder-soft feel. ',
  'Effortless contour or intuitive accent adds depth with a silky, matte finish—a more sculpted look with a sun-kissed glow.'
];
var textFaceElement = document.querySelector('.sustainable-routine-text--face');
var tabsFace = document.querySelectorAll('.sustainable-routine-tab--face');

textFaceElement.style.height = calcElementHeight(textsFace) + 'px';

tabsFace[0].classList.add('is-active');
textFaceElement.textContent = textsFace[0];

var prevSliderFaceIndex = sliderFace.index;
sliderFace.on('move', function() {

  if (prevSliderFaceIndex != sliderFace.index) {
    prevSliderFaceIndex = sliderFace.index;

    tabsFace.forEach(function(e) {
      e.classList.remove('is-active');
    });
  
    var tl = new TimelineMax();
    tl
      .to(textFaceElement, .2, { opacity: 0 })
      .add(function() {
        textFaceElement.textContent = textsFace[sliderFace.index];
      })
      .to(textFaceElement, .2, { opacity: 1 })
  
    tabsFace[sliderFace.index].classList.add('is-active');
  }
});

tabsFace.forEach(function(e, i) {
  e.addEventListener('click', function() {
    sliderFace.go(i);
  });
});


//////////////////////////////////////////


var sliderLip = new Splide('.splide--lip', {
  pagination: false,
  classes: {
    arrows: 'sustainable-routine-arrows',
    arrow: 'sustainable-routine-arrow',
    prev: 'sustainable-routine-arrow--prev',
    next: 'sustainable-routine-arrow--next'
  }
}).mount();

var textsLip = [
  'Triple-threat eyebrow pencil that defines, sculpts and sets in seconds, leaving you with a defined brow look you can’t beat. Activated by the natural oils of your brow hair, simplifying the way you detail your brow.',
  'This unrivaled eyeshadow formula glides on smoothly without creasing or fallout and locks onto lids for lasting wear (no primer necessary!). Featuring two luxurious finishes: a multidimensional shimmer and a creamy matte. ',
  'First-ever mascara with a built-in eyelash curler. Lash-lifting and moisturizing formula defines and separates, lengthens and volumizes. Clinical results show an increase in curve up to 186%!',
  'Add dimension and definition to your eyes with this versatile liner that will make application feel effortless yet look luxurious. Long-lasting yet gentle enough to use in your waterline.',
  'The cloud-like, airy texture of this lipstick delivers instant vivid matte color and feels undetectable on lips. Doesn’t bleed, feather, dry out or settle into fine lines. Comes with a twist-up lip balm that provides creamy hydration before lipstick or adds shine on top.',
  'Combines the moisturizing properties of a balm, the shine of a gloss and the color payoff of a stain. Leaves lips looking and feeling supple + shiny with a whisper of buildable color. Comes with a built-in lip primer to extend the wear of the lip color.'
];
var textLipElement = document.querySelector('.sustainable-routine-text--lip');
var tabsLip = document.querySelectorAll('.sustainable-routine-tab--lip');

textLipElement.style.height = calcElementHeight(textsLip) + 'px';

tabsLip[0].classList.add('is-active');
textLipElement.textContent = textsLip[0];

var prevSliderLipIndex = sliderLip.index;
sliderLip.on('move', function() {

  if (prevSliderLipIndex != sliderLip.index) {
    prevSliderLipIndex = sliderLip.index;

    tabsLip.forEach(function(e) {
      e.classList.remove('is-active');
    });
  
    var tl = new TimelineMax();
    tl
      .to(textLipElement, .2, { opacity: 0 })
      .add(function() {
        textLipElement.textContent = textsLip[sliderLip.index];
      })
      .to(textLipElement, .2, { opacity: 1 })
  
    tabsLip[sliderLip.index].classList.add('is-active');
  }
  
});

tabsLip.forEach(function(e, i) {
  e.addEventListener('click', function() {
    sliderLip.go(i);
  });
});



////////////////

function calcElementHeight(arrTexts) {
  var highestValue = 0;

  arrTexts.forEach(function(e) {
    var p = document.createElement('p');
    p.classList.add('sustainable-routine-text');
    p.textContent = e;
    document.body.appendChild(p);
    var pHeight = p.clientHeight;
    document.body.removeChild(p);

    if (pHeight > highestValue) {
      highestValue = pHeight;
    }
  });

  console.log(screen.width)
  if (screen.width <= 500) {
    highestValue = highestValue - 150;
  }
  
  return highestValue;
}
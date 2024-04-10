var buttonOpen = document.querySelector('.our-story-button--open');
var buttonClose = document.querySelector('.our-story-button--close');
var articleWrapper = document.querySelector('.our-story-text-wrapper');
var articleContent = document.querySelector('.our-story-text-content');


buttonOpen.addEventListener('click', function() {
  buttonOpen.classList.add('hide');

  articleWrapper.style.height = articleContent.clientHeight + 'px';
});

buttonClose.addEventListener('click', function() {
  buttonOpen.classList.remove('hide');
  articleWrapper.style.height = 0;
});
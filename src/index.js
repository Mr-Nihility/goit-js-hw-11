import { getImgs } from './API/pixabay';
import { createMarkup } from './js/createMarkUp';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//-------------------------------------------------//

const refs = {
  form: document.querySelector('.search-form'),
  target: document.querySelector('.target'),
  gallery: document.querySelector('.gallery'),
};
let page = 1;
let searchQuery = null;
let lightbox;

/////////////////////// for fun
setInterval(() => {
  document.body.style.backgroundColor = getRandomHexColor();
  refs.form.style.backgroundColor = getRandomHexColor();
}, 3000);

//-------------------------------------------------------//
const obs = new IntersectionObserver(onObs, {
  rootMargin: '300px',
});

refs.form.addEventListener('submit', onSubmitForm);
//---------------------------------------------------------//
function onSubmitForm(evt) {
  evt.preventDefault();
  obs.unobserve(refs.target);

  refs.gallery.innerHTML = '';
  page = 1;
  searchQuery = evt.target.elements.searchQuery.value;
  if (searchQuery === '') {
    return Notiflix.Notify.failure("Sorry, you didn't write anything");
  }
  getImgs(searchQuery, page)
    .then(response => {
      if (!response.totalHits) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      console.log(response);
      createMarkup(response.hits);
      lightbox = new SimpleLightbox('.gallery a');
      obs.observe(refs.target);
    })
    .catch(console.log);
}

function onObs(entries) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;

      getImgs(searchQuery, page)
        .then(response => {
          createMarkup(response.hits);
          lightbox.refresh();

          if (page * 40 > response.totalHits) {
            obs.unobserve(refs.target);
            return Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(console.log);
    }
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

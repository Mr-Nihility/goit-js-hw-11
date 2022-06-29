import './css/styles.css';
import { getImgs } from './API/pixabay';
import { createMarkup } from './js/createMarkUp';
import Notiflix from 'notiflix';
//-------------------------------------------------//

const refs = {
  form: document.querySelector('.search-form'),
  target: document.querySelector('.target'),
  gallery: document.querySelector('.gallery'),
};
let page = 1;
let searchQuery = null;

/////////////////////// for fun
setInterval(() => {
  document.body.style.backgroundColor = getRandomHexColor();
  refs.form.style.backgroundColor = getRandomHexColor();
}, 5000);

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
  getImgs(searchQuery, page)
    .then(response => {
      console.log(response);
      createMarkup(response.hits);
      obs.observe(refs.target);
    })
    .catch(console.log);
}

function onObs(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

      getImgs(searchQuery, page)
        .then(response => {
          createMarkup(response.hits);
          if (page * 5 > response.totalHits) {
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

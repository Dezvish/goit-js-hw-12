import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  initLightbox,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15;
let totalHits = 0;

const resetState = () => {
  currentPage = 1;
  totalHits = 0;
};

const showLoadMore = () => {
  loadMoreBtn.classList.remove('hidden');
};

const hideLoadMore = () => {
  loadMoreBtn.classList.add('hidden');
};

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  hideLoadMore();
  resetState();
  currentQuery = query;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(data.hits);
      initLightbox();
      if (PER_PAGE * currentPage < totalHits) {
        showLoadMore();
      } else {
        hideLoadMore();
        iziToast.info({
          title: '',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMore();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    createGallery(data.hits);
    initLightbox();

    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
    if (PER_PAGE * currentPage < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

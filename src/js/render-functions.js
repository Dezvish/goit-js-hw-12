import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export const createGallery = images => {
  const galleryContainer = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="image-info">
          <span><b>Likes:</b> ${likes}</span>
          <span><b>Views:</b> ${views}</span>
          <span><b>Comments:</b> ${comments}</span>
          <span><b>Downloads:</b> ${downloads}</span>
        </div>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  }
};

export const clearGallery = () => {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
};

export const showLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
  loader.classList.add('visible');
};

export const hideLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
  loader.classList.add('hidden');
};

export const initLightbox = () => {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

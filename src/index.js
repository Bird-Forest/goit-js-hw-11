import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { getGallery } from './axios';
import { creatMarkup } from './markup';
import { startLoader } from './loader';
import { stopLoader } from './loader';
import { stopGallery } from './loader';

const formSearch = document.querySelector('.search-form');
formSearch.addEventListener('submit', handlerForm);

const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onShowGallery);

const gallery = document.querySelector('.gallery');

let word = '';
let perPage = 40;
let page = 1;

function handlerForm(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    document.querySelector('.footer').classList.remove('open');
    page = 1;

    const data = new FormData(evt.currentTarget);
    word = JSON.stringify(data.get("searchQuery").trim());
    
    getGallery(word)
        .then(data => {

            if (data.total == 0) {
                Notify.warning('Sorry, there are no images matching your search query. Please try again.', notifyInit);
            }

            const arr = data.hits;
            creatMarkup(arr);

            if (arr.length < data.totalHits) {
                setTimeout(() => {
                    document.querySelector('.footer').classList.add('open');
                    btnLoadMore.classList.remove('is-hidden');
                    document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
                    formSearch.reset();
                }, 3000);
            };
        })
        .catch(err => console.log(err));
};

function onShowGallery() {
    page += 1;
    console.log(page);

    getGallery(word, page)
        .then(data => {

            startLoader();

            const totalPage = Math.ceil(data.totalHits / perPage);
            console.log(totalPage)

            const arr = data.hits;
            creatMarkup(arr);

            const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });

            if (page !== totalPage) {
                
                stopLoader();

            } else {
                
                stopGallery();
            }
        })
        .catch(err => console.log(err));
};

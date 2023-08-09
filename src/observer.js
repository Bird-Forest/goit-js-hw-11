// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { notifyInit } from './notify';
// import { getGallery } from './axios';
// import { creatMarkup } from './markup';

// const formSearch = document.querySelector('.search-form');
// formSearch.addEventListener('submit', handlerForm);

// const btnLoadMore = document.querySelector('.load-more');
// btnLoadMore.addEventListener('click', onLoad);

// const gallery = document.querySelector('.gallery');

// let page = 39;
// let word = '';

// const target = document.querySelector('.js-guard');

// let options = {
//   root: null,
//   rootMargin: "200px",
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(onLoadScroll, options);
// function onLoadScroll(entries, observer) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             console.log(entries)
//         }
//     })
// }

// function handlerForm(evt) {
//     evt.preventDefault();
//     const data = new FormData(evt.currentTarget);
//     word = JSON.stringify(data.get("searchQuery").trim());
    
//     getGallery(word)
//         .then(data => {
    
//             if (data.total === 0) {
//                 Notify.warning('Sorry, there are no images matching your search query. Please try again.', notifyInit);
//             }
//             const arr = data.hits;
//             creatMarkup(arr);

//             observer.observe(target)

//             if (Number(data.hits.length) * Number(page) < Number(data.totalHits)) {
//                 setTimeout(() => {
//                     document.querySelector('.footer').classList.toggle('open')
//                     btnLoadMore.style.opacity = 1;
//                     document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
//                 }, 3000);
//             };
//         })
//         .catch(err => console.log(err))
//         .finally(() => {
//             formSearch.reset();
//             // gallery.innerHTML = '';
//         });
// };

// function onLoad() {
//     page += 1;

//     getGallery(word, page)
//         .then(data => {
    
//             const arr = data.hits;
//             creatMarkup(arr);

//             if (Number(data.hits.length) * Number(page) > Number(data.totalHits)) {
//                 btnLoadMore.style.opacity = 0;
//                 document.querySelector('.message').textContent = `We\'re sorry, but you\'ve reached the end of search results.`;
//             };
//         })
//         .catch(err => console.log(err))
//         .finally(() => {
//             setTimeout(() => {
//                 document.querySelector('.footer').classList.remove('open')
//             }, 5000);
//         });
// };




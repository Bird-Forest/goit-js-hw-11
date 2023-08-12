import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { getGallery } from './axios';
import { creatMarkup } from './markup';

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
    console.log(word)
    
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
    console.log(page)
    
    getGallery(word, page)
        .then(data => {

            const totalPage = Math.ceil(data.totalHits / perPage);
            console.log(totalPage)

            const arr = data.hits;

            btnLoadMore.classList.add('is-hidden');
            
            creatMarkup(arr);

            btnLoadMore.classList.remove('is-hidden');
        
            const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });

            if (page === totalPage) {
                btnLoadMore.classList.add('is-hidden');
                document.querySelector('.message').textContent = "We're sorry, but you've reached the end of search results.";

                setTimeout(() => {
                    document.querySelector('.footer').classList.remove('open')
                }, 5000);            
            };
        })
        .catch(err => console.log(err));
};























// async function getGallery(word) {
//     try {
//         const response = await axios.get('https://pixabay.com/api/',
//             {
//                 params: {
//                     key: '38659360-bc0842e55c2c51de5ea7c36c0',
//                     q: `${word}`,
//                     image_type: 'photo',
//                     orientation: ' horizontal',
//                     safesearch: true
//                 }
//             });
        
//         hits = response.data
//         // console.log(hits)
//         return hits
//     }
//     catch (error) { console.error(error) }
    
// };


// axios.get('https://pixabay.com/api/', {
//     params: {
//     key: '38659360-bc0842e55c2c51de5ea7c36c0',
//     q: 'cat',
//     image_type: 'photo',
//     orientation:' horizontal',
//     safesearch: true
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // выполняется всегда
//   });

  // Хотите использовать async/await? Добавьте ключевое слово `async` к своей внешней функции/методу.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }



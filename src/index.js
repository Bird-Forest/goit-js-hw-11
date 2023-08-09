import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { getGallery } from './axios';
import { creatMarkup } from './markup';

const formSearch = document.querySelector('.search-form');
formSearch.addEventListener('submit', handlerForm);

const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onLoad);

const gallery = document.querySelector('.gallery');

let word = '';
let perPage = 40;
let page = 1;
let counterHits = 0;
console.log(counterHits)

function handlerForm(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    counterHits = perPage;

    document.querySelector('.footer').classList.remove('open');

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
                    btnLoadMore.style.opacity = 1;
                    document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
                    formSearch.reset();
                    
                }, 3000);
            };
        })
        .catch(err => console.log(err));
    return counterHits = perPage;
};

function onLoad() {
    page += 1;
    
    getGallery(word, page)
        .then(data => {
            const arr = data.hits;

            counterHits += arr.length;
            console.log(counterHits)
            console.log(data.totalHits)

            creatMarkup(arr)

            const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
    
            if (counterHits === data.totalHits) {
                btnLoadMore.style.opacity = 0;
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



import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios').default;

const formSearch = document.querySelector('.search-form')
console.dir(formSearch)
formSearch.addEventListener('submit', handlerForm)




function handlerForm(evt) {
    evt.preventDefault()
    // const word = document.querySelector(['input[name="searchQuery"]']).value.trim()
    const data = new FormData(evt.currentTarget)
    const word = JSON.stringify(data.get("searchQuery").trim());
    
    getGallery(word)
        .then(data => {
        
            const arr = data.hits
            
            creatMarkup(arr);
           
    })
    .catch (err => console.log(err));

}

async function getGallery(word) {
    
    const response = await axios.get('https://pixabay.com/api/',
        {
            params: {
                key: '38659360-bc0842e55c2c51de5ea7c36c0',
                q: `${word}`,
                image_type: 'photo',
                orientation: ' horizontal',
                safesearch: true
            }
        })
    const data = response.data
    
    return data
};

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

function creatMarkup(arr) {

    const gallery = document.querySelector('.gallery');

    const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 

    `<div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo"/></a>
    <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div>
    </div>`).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}
















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



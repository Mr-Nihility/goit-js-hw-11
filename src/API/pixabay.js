import axios from 'axios';
//----------------------------------------------//

const KEY_PIX = '28317222-241a165b1fe9d2b89a64d5785';
const BASE_URL = 'https://pixabay.com/api/';

function getImgs(name, page) {
  const params = new URLSearchParams({
    key: KEY_PIX,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: false,
    q: name,
    page: page,
    per_page: 5,
  });

  return fetch(`${BASE_URL}?${params}`).then(r => r.json());
}

export { getImgs };

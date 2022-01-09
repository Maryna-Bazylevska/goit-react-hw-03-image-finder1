import axios from "axios";

const KEY = "14352220-777927f32e4bda0aacdcec250";
const URL = `https://pixabay.com/api/`;

export const fetchImages = (query, page) => {
  return axios.get(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default fetchImages;

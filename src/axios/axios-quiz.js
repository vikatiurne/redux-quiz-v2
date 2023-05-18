import axios from "axios";

export default axios.create({
baseURL: 'https://quiz-tiurne-default-rtdb.firebaseio.com/'
})
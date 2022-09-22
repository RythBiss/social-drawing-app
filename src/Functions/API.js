import { useNavigate } from 'react-router-dom'

const baseURL = 'https://jsonplaceholder.typicode.com/photos?_page=1';

export const authorizeUser = () => {
    console.log('Authorized!');

    if(true) return true;

    return false;
}

export const getRecentPosts = async () => {
    let posts = null;

    await fetch('https://jsonplaceholder.typicode.com/photos?_page=1')
    .then(res => res.json())
    .then(data => posts = data);

    return posts;
}
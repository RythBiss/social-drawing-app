const baseURL = 'https://jsonplaceholder.typicode.com';

export const authorizeUser = () => {
    console.log('Authorized!');

    if(true) return true;

    return false;
}

export const getRecentPosts = async () => {
    let posts = null;

    await fetch(`${baseURL}/photos?_page=1`)
    .then(res => res.json())
    .then(data => posts = data);

    return posts;
}
import { auth, storage } from '../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const baseURL = 'https://jsonplaceholder.typicode.com';

export const getRecentPosts = async () => {
    let posts = null;

    await fetch(`${baseURL}/photos?_page=1`)
    .then(res => res.json())
    .then(data => posts = data);

    return posts;
}

export const postDrawing = async(canvas) => {
    const drawingRefFB = ref(
        storage,
        `drawings/canvas-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
    );

    canvas.toBlob((blob) => {
        uploadBytes(drawingRefFB, blob).then(() => {
            getDownloadURL(ref(storage, drawingRefFB._location.path_)).then(r => console.log(r));
            console.log(auth.currentUser.uid);
        });
    });
}
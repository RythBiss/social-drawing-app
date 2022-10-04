import { auth, storage, database } from '../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, getDocs, addDoc } from 'firebase/firestore';

const baseURL = 'https://jsonplaceholder.typicode.com';
const postsTableRef = collection(database, 'posts');

export const getPosts = async(setPosts) => {
    const response = await getDocs(postsTableRef);
    setPosts(response.docs.map((entry) => ({...entry.data(), id: entry.id})));
  }

export const postDrawing = async(canvas) => {
    const drawingRefFB = ref(
        storage,
        `drawings/canvas-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
    );

    canvas.toBlob((blob) => {
        let author = auth.currentUser.email;

        uploadBytes(drawingRefFB, blob).then(() => {
            getDownloadURL(ref(storage, drawingRefFB._location.path_))
            .then((r) => {
                createPost(author, r);
            });
        });
    });
}

const createPost = async(author, url) => {
    await addDoc(postsTableRef, { author_id: author, image_url: url, prompt: 'feature is WIP', stars: 0 });
}
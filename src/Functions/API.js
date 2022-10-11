import { auth, storage, database } from '../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const postsTableRef = collection(database, 'posts');

const createPost = async(author, url) => {
    await addDoc(postsTableRef,{
        author_id: author,
        author_uid: auth.currentUser.uid,
        profile_img: auth.currentUser.photoURL,
        image_url: url,
        prompt: 'feature is WIP',
        date_time: serverTimestamp()
    });
}

export const getPosts = async(setPosts) => {
    const postQuery = query(postsTableRef, orderBy('date_time', 'desc'));
    const response = await getDocs(postQuery);

    setPosts(response.docs.map((entry) => ({...entry.data(), id: entry.id})));
}

export const getHistory = async(setPosts, user) => {
    const postQuery = query(postsTableRef, where("author_id", "==", `${user}`), orderBy('date_time', 'desc'));
    const response = await getDocs(postQuery);
    
    setPosts(response.docs.map((entry) => ({...entry.data(), id: entry.id})));
}

export const postDrawing = async(canvas) => {
    const drawingRefFB = ref(
        storage,
        `drawings/${auth.currentUser.uid}/canvas-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
    );

    await canvas.toBlob((blob) => {
        const author = auth.currentUser.displayName;

        uploadBytes(drawingRefFB, blob).then(() => {
            getDownloadURL(ref(storage, drawingRefFB._location.path_))
            .then((response) => {
                createPost(author, response);
            });
        });
    });
}

export const handleUpdateProfile = async(name, img) => {
    if(img){
        const uploadRefFB = ref(
            storage,
            `uploads/${auth.currentUser.uid}/upload-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
        );

        uploadBytes(uploadRefFB, img).then(() => {
            getDownloadURL(ref(storage, uploadRefFB._location.path_))
            .then((url) => {
                updateProfile(auth.currentUser, {
                    photoURL: url
                })
            });
        });
    }

    if(name){
        updateProfile(auth.currentUser, {
            displayName: name
        });
    }
}
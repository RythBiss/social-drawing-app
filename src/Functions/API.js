import { auth, storage, database } from '../firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where, doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc, limit, startAfter } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const postsTableRef = collection(database, 'posts');
const followTableRef = collection(database, 'follow_lists');
const userTableRef = collection(database, 'user_data');
const postStarLists = collection(database, 'star_lists');

const createPost = async(author, url, callback) => {
    await addDoc(postsTableRef,{
        author_id: author,
        author_uid: auth.currentUser.uid,
        profile_img: auth.currentUser.photoURL,
        image_url: url,
        date_time: serverTimestamp()
    })
    .then((res) => createPostStarList(res.id, callback))
}

const createPostStarList = async(id, callback) => {
    await addDoc(postStarLists, {
        post_id: id,
        post_stars: arrayUnion(auth.currentUser.uid)
    })
    .then(() => {callback();})
}

export const getFollowed = async() => {
try{
    const followList = await getDocs(query(followTableRef, where('owner', '==', auth.currentUser.uid)));

    return followList;
}catch(e){
    console.log(e)
}
}

export const getPosts = async(setPosts, after) => { 
    const postQuery = after ? query(postsTableRef, orderBy('date_time', 'desc'), limit(5), startAfter(after)) : query(postsTableRef, orderBy('date_time', 'desc'), limit(5));
    const response = await getDocs(postQuery);

    setPosts(response.docs.map((entry) => ({...entry.data(), id: entry.id})));
}

export const getHistory = async(setPosts, user) => {
    const postQuery = query(postsTableRef, where("author_id", "==", `${user}`), orderBy('date_time', 'desc'));
    const response = await getDocs(postQuery);

    setPosts(response.docs.map((entry) => ({...entry.data(), id: entry.id})));
}

export const postDrawing = async(canvas, callback) => {
    const drawingRefFB = ref(
        storage,
        `drawings/${auth.currentUser.uid}/canvas-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
    );

    await canvas.toBlob((blob) => {
        const author = auth.currentUser.displayName;

        uploadBytes(drawingRefFB, blob).then(() => {
            getDownloadURL(ref(storage, drawingRefFB._location.path_))
            .then((response) => {
                createPost(author, response, callback);
            });
        });
    });
}

export const handleUpdateProfile = async(name, img, callback) => {
    const update = async () => {
        if(img){
            const uploadRefFB = ref(
                storage,
                `uploads/${auth.currentUser.uid}/upload-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
            );
    
            uploadBytes(uploadRefFB, img).then(async() => {
                getDownloadURL(ref(storage, uploadRefFB._location.path_))
                .then((url) => {
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    })
                    .then(async() => await setUserDoc())

                    callback(url);
                });
            });
        }
    
        if(name){
            updateProfile(auth.currentUser, {
                displayName: name
            })
            .then(async() => await setUserDoc())
        }
    }

    await update();
}

export const handleFollow = async(followUser) => {
    const followList = await getFollowed();

    const docRef = doc(database, "follow_lists", followList.docs[0].id);

    await isFollowingUser(followUser)
    .then(async(res) => {
        if(res){
            await updateDoc(docRef, {
                followed: arrayRemove(followUser)
            })
        }else{
            await updateDoc(docRef, {
                followed: arrayUnion(followUser)
            })
        }
    })

    return await isFollowingUser(followUser);
}

export const isFollowingUser = async(user) => {
    let response = false
    
    await getFollowed()
    .then(list => 
        {
            if(list.docs[0].data().followed){
                list.docs[0].data().followed.forEach(uid => {
                    if(uid === user) response = true;
                })
            }
        }
    );
    
    return response;
}

export const createUserDocs = async() => {
    await setUserDoc();

    await setDoc(doc(followTableRef, auth.currentUser.uid), {
        owner: auth.currentUser.uid
    })
}

const setUserDoc = async() => {
    await setDoc(doc(userTableRef, auth.currentUser.uid), {
        userID: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL
    })
}

export const getUserData = async(uid) => {
    const userDoc = doc(userTableRef, uid);
    const userDocRef = await getDoc(userDoc);
    const userData = userDocRef.data();
    
    return userData;
}
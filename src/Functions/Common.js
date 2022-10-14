import FollowingCard from "../Components/FollowingCard"
import Post from "../Components/Post"

export const mapPosts = (posts) => {
    return posts.length === 0 ? (<h3>Loading...</h3>) : (Object.keys(posts).map( current => 
        <Post
            key={posts[current].id}
            postId={posts[current].id}
            content={posts[current].image_url}
            author={posts[current].author_id}
            uid={posts[current].author_uid}
            user_photo={posts[current].profile_img}
            prompt={posts[current].prompt}
            stars={posts[current].star_users ? posts[current].star_users.length : 0 }
        />
    ))
}

export const mapUsers = (users) => {
    return users.length === 0 ? (<h3>Loading...</h3>) : (Object.keys(users).map(current => 
        <FollowingCard
            key={current}
            uid={users[current].userID}
            user={users[current].displayName}
            user_photo={users[current].photoURL}
        />
    ))
}
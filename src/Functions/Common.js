import Post from "../Components/Post"

export const mapPosts = (posts) => {
    return posts.length === 0 ? (<h3>Loading...</h3>) : (Object.keys(posts).map( current => 
        <Post key={posts[current].id} content={posts[current].image_url} author={posts[current].author_id} prompt={posts[current].prompt} stars={posts[current].stars} />
        ))
}
import FollowingCard from "../Components/FollowingCard"
import Post from "../Components/Post"

export const mapPosts = (posts) => {
    const listItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      };

    return posts.map((item, i) => (
        <Post key={i} variants={listItem}
          postId={item.id}
          content={item.image_url}
          author={item.author_id}
          uid={item.author_uid}
          user_photo={item.profile_img}
          prompt={item.prompt}
          stars={item.star_users ? item.star_users.length : 0 }
        />
      ))
}

export const mapUsers = (users) => {
  try{
    return users.length === 0 ? <></> : (Object.keys(users).map(current => 
      <FollowingCard
          key={current}
          uid={users[current].userID}
          user={users[current].displayName}
          user_photo={users[current].photoURL}
      />
  ))
  }catch(e){
    console.log(`error ${e}`)
  }
}
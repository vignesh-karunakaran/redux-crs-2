import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllPosts, getPostError, getPostStatus, fetchPosts } from "./postSlice";
import PostExcerpts from "./PostExcerpts";



const PostList = () => {
 const dispatch = useDispatch();
 const posts = useSelector(selectAllPosts);
 const postStatus = useSelector(getPostStatus);
 const error = useSelector(getPostError);

 useEffect(() => {
   if(postStatus === 'idle') {
      dispatch(fetchPosts());
   }
 },[postStatus, dispatch]);
 let  content;
 if (postStatus === 'loading') {
   content = <p>Loading...</p>;
} else if (postStatus === 'succeeded') {
   content = posts.map(post => <PostExcerpts key={post.id} post={post} />)
} else if (postStatus === 'failed') {
   content = <p>{error}</p>;
}
 return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
 );
};
export default PostList;
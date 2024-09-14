import React from 'react';
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

const PostExcerpts = ({post}) => {
  return (
    <article>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <p className="postCredit">
    <PostAuthor userId={post.userId} />
    <ReactionButtons post = {post} />
    </p>
    </article>
  )
}

export default PostExcerpts;
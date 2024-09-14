import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {

    const dispatch = useDispatch();
    const [ title, setTitle] = useState('');
    const [ content, setContent] = useState('');
    const [ userId, setUserId] = useState('');
    const users = useSelector(selectAllUsers);
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthChanged = (e) => setUserId(e.target.value);

    const savePost = () => {
        if(title && content) {
            dispatch(postAdded(title,content, userId))
            setTitle('');
            setContent('');
            setUserId('');
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add new post</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={onTitleChanged} />
                <label htmlFor="author">Author</label>
                <select id="author" value={userId} onChange={onAuthChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="content">Content</label>
                <input type="text" name="content" value={content} onChange={onContentChanged} />
                <button type="button" onClick={savePost}>Save</button>
            </form>
        </section>
    )
};

export default AddPostForm;
import './App.css';
import PostList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';
function App() {
  return (
    <main>
      <AddPostForm/>
      <PostList/>
    </main>
  );
}

export default App;

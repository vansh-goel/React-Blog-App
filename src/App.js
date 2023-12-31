import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import MissingPage from "./MissingPage";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = React.useState(localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []);
  const [search, setSearch] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = React.useState('');
  const [postBody, setPostBody] = React.useState('');

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse());
  },[posts, search]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    localStorage.setItem('posts', JSON.stringify(allPosts));
    setPostTitle('');
    setPostBody(''); 
    navigate('/')
  }

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList);
    localStorage.setItem('posts', JSON.stringify(postList));
    navigate('/');
  }

  return (
    <div className="App">
      <Header title="Blog Application" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home
            posts={searchResults}
         />}/>
        <Route exact path="/post" element={<NewPost 
          postTitle={postTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          setPostTitle={setPostTitle}
          handleSubmit={handleSubmit}
        />} />
        <Route path="/post/:id" element={<PostPage 
          posts={posts}
          handleDelete={handleDelete}
        />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

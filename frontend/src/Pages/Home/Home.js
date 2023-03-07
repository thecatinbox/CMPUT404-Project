import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Home.css';

function Home() {

  // const uuid = localStorage.getItem('uuid'); 
  // console.log(uuid); 
  const ENDPOINT = 'http://localhost:8000/server/posts/'; 

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(ENDPOINT, {
      headers: { "Accept": "application/json" },
      method: "GET"
    }).then(response => response.json()).then(postData => {
      setPostList(postData.items);
      // console.log(postData)
    });
  })

  return (
    <>
      <TopBar id="home"/>
      <div className="home">
        <AddPost/>
        {postList.reverse().map(function(post){
            return <Post post={post} key={post.id}/>;
        })}
        
      </div>
    </>

  );
}

export default Home;

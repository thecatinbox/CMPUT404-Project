import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Home.css';

function Home() {

  // const uuid = localStorage.getItem('uuid'); 
  // console.log(uuid); 
  const app_url = localStorage.getItem('url'); 
  const ENDPOINT = 'http://' + app_url + '/server/posts/'; 

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(ENDPOINT, {
      headers: { "Accept": "application/json" },
      method: "GET"
    }).then(response => response.json()).then(postData => {
      setPostList(postData.items);
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

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

  async function fetchData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json" },
        method: "GET"
      });
  
      const data = await response.json();
      setPostList(data.items);
      // console.log(postList); 
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []); 

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

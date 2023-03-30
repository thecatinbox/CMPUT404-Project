import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import TopBar from "../../Components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {

  // const uuid = localStorage.getItem('uuid'); 
  // console.log(uuid); 
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  // If not signed in, go to home page 
  if (!localStorage.getItem('uuid')) {
    navigate("/signin");
  }

  const app_url = localStorage.getItem('url'); 
  const ENDPOINT = app_url + '/server/posts/'; 

  async function fetchData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json" },
        method: "GET"
      });
  
      const data = await response.json();
      setPostList(data.items);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }
  
  async function fetchTeam16Data() {
    const TEAM16_ENDPOINT = 'https://sd16-api.herokuapp.com/service/authors/'; 
    return axios.get(TEAM16_ENDPOINT, {
      headers: {
        "Authorization": 'Basic ' + btoa('Team12:P*ssw0rd!')
      }
    })
      .then(async res => {
        // console.log(res.data.items); 
        const team1authorsList = res.data.items; 
        let promises = []; // to store all post requests
  
        for (let author of team1authorsList) {
          if (author.id.includes(TEAM16_ENDPOINT)) {
            const url = author.id + '/posts/'; 
            // console.log(url); 
            const promise = axios.get(url, {
              headers: {
                "Authorization": 'Basic ' + btoa('Team12:P*ssw0rd!')
              }
            }).then(res => {
              // console.log(res.data.items); 
              return res.data.items; 
            }).catch(err => {
              // console.error(err);
              return []; 
            });
            if (promise != []) { 
              promises.push(promise); // add the post request promise to array
            }
          }
        }

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('This will run every second!');
      Promise.all([fetchData(), fetchTeam16Data(), fetchTeam1Data()]).then(results => {
        const postList12 = results[0];
        const postList16 = []; //results[1];
        const postList1 = results[2];
        const mergedPostList = [...postList12, ...postList16, ...postList1];
        setPostList(mergedPostList.sort((a, b) => new Date(a.published) - new Date(b.published)));
      });
    }, 1000); 
    return () => clearInterval(interval);
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

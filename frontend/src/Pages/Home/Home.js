import React, {useState, useEffect} from 'react';
import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import TopBar from "../../Components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import Box from '@mui/material/Box';
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
      return data.items;
    } catch (error) {
      console.error('Error:', error);
      return []; 
      // Handle the error here
    }
  }
  
  async function fetchTeam16Data() {
    return axios.get('https://sd16-api.herokuapp.com/service/authors/afe5dcfe-a763-41c0-8984-f72c1eddb084/posts/', {
      headers: {
        Authorization: 'Basic ' + btoa('Team12:P*ssw0rd!')
      }
    })
    .then(res => {
      console.log(res.data); 
      return res.data.posts;
    }).catch(err => {
      console.error(err);
      return [];
    });
  }

  /* 
  async function fetchTeam16Data() {
    return axios.get('https://sd16-api.herokuapp.com/service/authors/', {
      headers: {
        Authorization: 'Basic ' + btoa('Team12:P*ssw0rd!')
      }
    })
      .then(async res => {
        console.log(res.data.items); 
        const team1authorsList = res.data.items; 
        let promises = []; // to store all post requests
  
        for (let author of team1authorsList) {
          const url = author.url + '/posts/'; 
          console.log(url); 
          const promise = axios.get(url, {
            headers: {
              Authorization: 'Basic ' + btoa('Team12:P*ssw0rd!')
            }
          }).then(res => {
            console.log(res.data.posts); 
            return res.data.posts; 
          });
          promises.push(promise); // add the post request promise to array
        }

        const team16postList = await Promise.all(promises).then(posts => {
          return [].concat(...posts);
        });
          
        console.log(team16postList); 
        return team16postList;
      });
  }*/

  async function fetchTeam1Data() {
    return axios.get('https://p2psd.herokuapp.com/authors/')
      .then(async res => {
        // console.log(res.data.items); 
        const team1authorsList = res.data.items; 
        let promises = []; // to store all post requests
  
        for (let author of team1authorsList) {
          const url = author.id + '/posts/'; 
          // console.log(url); 
          const promise = axios.get(url).then(res => {
            // console.log(res.data.items); 
            return res.data.items; 
          });
          promises.push(promise); // add the post request promise to array
        }

        const team1postList = await Promise.all(promises).then(posts => {
          return [].concat(...posts);
        });
          
        // console.log(team1postList); 
        return team1postList;
      }).catch(err => {
        console.error(err);
        return [];
      });
  }
  
  useEffect(() => {
    Promise.all([fetchData(), fetchTeam16Data(), fetchTeam1Data()]).then(results => {
      const postList12 = results[0];
      const postList16 = results[1];
      const postList1 = results[2];
      const mergedPostList = [...postList12, ...postList16, ...postList1];
      setPostList(mergedPostList.sort((a, b) => new Date(a.published) - new Date(b.published)));
    });
  }, []);

  return (
    <>
      <TopBar id="home"/>
      <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw'}}>
      <div className="home">
        <div className="posts">
        
        <AddPost/>
        {postList.reverse().map(function(post){
            return <Post post={post} key={post.id}/>;
        })}
        
        </div>
      </div>
      </Box>
    </>

  );
}

export default Home;

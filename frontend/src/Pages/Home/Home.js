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
  // const [isDataFetched, setIsDataFetched] = useState(false); // Add state variable

  // If not signed in, go to home page 
  if (!localStorage.getItem('uuid')) {
    navigate("/signin");
  }

  const app_url = localStorage.getItem('url'); 
  const ENDPOINT = app_url + '/service/posts/'; 
  
  async function fetchData() {
    try {
      const response = await axios.get(ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') },
      });
      const filteredItems = response.data.items.filter(item => item.origin === null);
      return filteredItems;
    } catch (error) {
      console.error('Error:', error);
      return [];
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

        const team1postList = await Promise.all(promises).then(posts => {
          return [].concat(...posts);
        });

        return team1postList;
      }).catch(err => {
        // console.error(err);
        return [];
      });
  }

  async function fetchTeam1Data() {
    const TEAM1_ENDPOINT = 'https://p2psd.herokuapp.com/authors/'; 
    return axios.get(TEAM1_ENDPOINT, {
      headers: {
        "Authorization": 'Basic cDJwYWRtaW46cDJwYWRtaW4='
      }
    })
      .then(async res => {
        // console.log(res.data.items); 
        const team1authorsList = res.data.items; 
        let promises = []; // to store all post requests
  
        for (let author of team1authorsList) {
          if (author.id.includes(TEAM1_ENDPOINT)) {
            const url = author.id + '/posts/'; 
            // console.log(url); 
            const promise = axios.get(url, {
              headers: {
                "Authorization": 'Basic cDJwYWRtaW46cDJwYWRtaW4='
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

        const team1postList = await Promise.all(promises).then(posts => {
          return [].concat(...posts);
        });
          
        // console.log(team1postList); 
        return team1postList;
      }).catch(err => {
        // console.error(err);
        return [];
      });
  }
  

  useEffect(() => {
    // const fetchDataInterval = setInterval(() => {
      // if (!isDataFetched) { // Fetch data only if it has not been fetched already
        Promise.all([fetchData(), fetchTeam16Data(), fetchTeam1Data()]).then(results => {
          const postList12 = results[0];
          const postList16 = results[1];
          const postList1 = results[2];
          const mergedPostList = [...postList12, ...postList16, ...postList1];
          setPostList(mergedPostList.sort((a, b) => new Date(a.published) - new Date(b.published)));
          // setIsDataFetched(true); // Set the state variable to true after fetching the data
        });
      // }
    // }, 1000);
  
    // return () => clearInterval(fetchDataInterval); // Clear the interval on unmount
  }, []); //, [isDataFetched]

  return (
    <>
      <TopBar id="home"/>
      {/* <Box sx={{  bgcolor: "#E6EAF3", height: '100%', minHeight: '100vw'}}> */}
      <div className="home">
        <div className="posts">

        {postList.reverse().map(function(post){
            return <Post post={post} key={post.id}/>;
        })}
        
        </div>
      </div>
      {/* </Box> */}
    </>

  );
}

export default Home;
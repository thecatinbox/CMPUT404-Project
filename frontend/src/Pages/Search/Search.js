import './Search.css';
import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import React, {useState, useEffect} from 'react';

function Search() {
  const queryString = window.location.search;
  const parameter = queryString.split('=')[1].toLowerCase();
  // console.log(parameter);
  const app_url = localStorage.getItem('url'); 

  const ENDPOINT = app_url + '/service/authors/'; 
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await fetch(ENDPOINT, {
        headers: { "Accept": "application/json", "Authorization": 'Basic ' + btoa('username1:123') }, 
        method: "GET"
      });
  
      const data = await response.json();
      setUserList(data.items.filter(item => item.displayName.toLowerCase().includes(parameter)));
      setIsLoading(false); // Set isLoading to false after we get the response
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []); // Only run this effect once on mount
  
  return (
    <>
      <TopBar id="search"/>
      <div className="search">
      {isLoading ? ( // Display a loading message while isLoading is true
        <h2>Loading Search Results...</h2>
      ) : (
        userList.length > 0 ? (
          <>
            <h2>Search Results for "{parameter}"</h2>
            {userList.map(function(user) {
              return <User user={user} key={user.id} />;
            })}
          </>
        ) : (
          <h2>No result found</h2>
        )
      )}
      </div>
    </>
  );
}

export default Search;
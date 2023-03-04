import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Friends.css';

const followingData = [
  {
    id: 1, 
    displayName: "Username1"
  },
  {
    id: 2, 
    displayName: "Username2"
  },
  {
    id: 3, 
    displayName: "Username3"
  },
];

const followerData = [
  {
    id: 1, 
    displayName: "Username1"
  },
  {
    id: 4, 
    displayName: "Username4"
  },
  {
    id: 5, 
    displayName: "Username5"
  },
  {
    id: 6, 
    displayName: "Username6"
  },
];

function Friends() {
  return (
    <>
      <TopBar id="friends"/>
      <div className="friends">

        <div className="following">
          <h2>My Followings</h2>
          {followingData.map(function(user){
              return <User user={user} key={user.id}/>;
          })}
        </div>

        <div className="follower">
          <h2>My Followers</h2>
          {followerData.map(function(user){
              return <User user={user} key={user.id}/>;
          })}
        </div>

      </div>
    </>
  );
}

export default Friends;
import User from '../../Components/User/User'; 
import TopBar from "../../Components/TopBar/TopBar";
import './Friends.css';

const followingData = [
  {
    displayName: "Username1"
  },
  {
    displayName: "Username2"
  },
  {
    displayName: "Username3"
  },
];

const followerData = [
  {
    displayName: "Username1"
  },
  {
    displayName: "Username4"
  },
  {
    displayName: "Username5"
  },
  {
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
              return <User user={user}/>;
          })}
        </div>

        <div className="follower">
          <h2>My Followers</h2>
          {followerData.map(function(user){
              return <User user={user}/>;
          })}
        </div>

      </div>
    </>
  );
}

export default Friends;
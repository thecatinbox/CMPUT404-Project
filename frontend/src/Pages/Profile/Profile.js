import Post from '../../Components/Post/Post'; 
import './Profile.css';

const userData = {
  "type":"author",
  "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
  "host":"http://127.0.0.1:5454/",
  "displayName":"Lara Croft",
  "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
  "github": "http://github.com/laracroft",
  "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
}

const postData = [
  {
    author: "Username1", 
    title: "Title1", 
    date: "2023-02-28", 
    content: "This is my first post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
  {
    author: "Username1", 
    title: "Title2", 
    date: "2023-02-28", 
    content: "This is my second post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
];

function Profile() {
  return (
    <div className="profile">
      <div className='profile-data'>
        <img src={userData.profileImage} alt="Image Description"></img>
        <h2>{userData.displayName}</h2>
        <button>Edit Profile</button>

      </div>

      <div className='post-data'>
        {postData.map(function(post){
            return <Post post={post}/>;
        })}
      </div>
    </div>
  );
}

export default Profile;
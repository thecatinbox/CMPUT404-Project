import Post from '../../Components/Post/Post'; 
import AddPost from '../../Components/AddPost/AddPost'; 
import './Home.css';

const postData = [
  {
    author: "Username1", 
    title: "Title1", 
    date: "2023-02-28", 
    content: "This is my first post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
  {
    author: "Username2", 
    title: "Title2", 
    date: "2023-02-28", 
    content: "This is my second post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
  {
    author: "Username3", 
    title: "Title3", 
    date: "2023-02-28", 
    content: "This is my third post. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  },
];


function Home() {
  return (
    <div className="home">
      <AddPost/>
      {postData.map(function(post){
          return <Post post={post}/>;
      })}
      
    </div>
  );
}

export default Home;

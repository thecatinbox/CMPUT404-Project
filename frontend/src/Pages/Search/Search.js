import './Search.css';
import Message from '../../Components/Message/Message'; 
import TopBar from "../../Components/TopBar/TopBar";

const messageData = [
  {
    id: 1, 
    content: "Username1"
  },
  {
    id: 2, 
    content: "Username2"
  },
  {
    id: 3, 
    content: "Username3"
  },
];

function Search() {
  return (
    <>
      <TopBar id="search"/>
      <div className="search">
        {messageData.map(function(message){
            return <Message message={message} key={message.id}/>;
        })}
      </div>
    </>
  );
}

export default Search;
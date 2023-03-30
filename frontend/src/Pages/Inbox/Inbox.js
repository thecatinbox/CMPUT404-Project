import './Inbox.css';
import Message from '../../Components/Message/Message'; 
import TopBar from "../../Components/TopBar/TopBar";

const messageData = [
  {
    id: 1, 
    content: "Username1 liked your post"
  },
  {
    id: 2, 
    content: "Username2 wants to follow you"
  },
  {
    id: 3, 
    content: "Username3 commented on your post"
  },
];

function Inbox() {
  return (
    <>
      <TopBar id="inbox"/>
      <div className="inbox">
        {messageData.map(function(message){
            return <Message message={message} key={message.id}/>;
        })}
      </div>
    </>
  );
}

export default Inbox;
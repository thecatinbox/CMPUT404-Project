import './Inbox.css';
import Message from '../../Components/Message/Message'; 
import TopBar from "../../Components/TopBar/TopBar";

const messageData = [
  {
    content: "Username1 liked your post"
  },
  {
    content: "Username2 wants to follow you"
  },
  {
    content: "Username3 commented on your post"
  },
];

function Inbox() {
  return (
    <>
      <TopBar id="inbox"/>
      <div className="inbox">
        {messageData.map(function(message){
            return <Message message={message}/>;
        })}
      </div>
    </>
  );
}

export default Inbox;
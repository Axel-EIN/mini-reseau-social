import { useState, useEffect } from 'react';
import { getAllMessages } from '../../api/api-client';
import { Link } from 'react-router-dom';

const InboxProfile = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getAllMessages();
        setMessages(data);
      } catch (error) {
        console.error('error', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <header>
        <h1>Profile</h1>
        <Link to="/messages">Message</Link>
      </header>
    </div>
  );
};

export default InboxProfile;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/actions';
import { connectSocket } from '../store/socket';

const Chat = () => {
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [joined, setJoined] = useState(false);

    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    const handleJoin = () => {
        if (!username.trim() && !username.trim()) return;

        connectSocket(username, password, dispatch);
        setJoined(true);
    };

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ text }));
            setText('');
        }
    };

    if (!joined) {
        return (
            <div>
                <h2>Join Chat</h2>
                <input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p>      </p>
                <input
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p> Password: supersecret     </p>

                <button onClick={handleJoin}>Join</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Chat App</h2>

            <div>
                {messages.map((msg, i) => (
                    <div key={i}>
                        <strong>{msg.username}:</strong>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;

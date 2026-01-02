import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/actions';

const Chat = () => {
    const [text, setText] = useState('');
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ text }));
            setText('');
        }
    };

    return (
        <div>
            <h2>Chat App</h2>

            <div>
                {messages.map((msg, i) => (
                    <p key={i}>{msg.text}</p>
                ))}
            </div>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;

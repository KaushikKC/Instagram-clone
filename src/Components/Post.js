import React, { useEffect, useState } from 'react';
import '../CSS/Post.css'
import { Avatar } from '@mui/material';
import { db } from '../firebase';
import {collection, doc, onSnapshot, addDoc, serverTimestamp, orderBy} from "firebase/firestore";

function Post({user,postId, username, caption, ImageURL}) {
  const [comments, setComments] =useState([]);
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const docref = doc(collection(db,'posts'),postId)
      unsubscribe = onSnapshot(collection(docref,'comments'),orderBy('timestamp','desc'),(snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      })
    }
  
    return () => {
      unsubscribe();
    };
  }, [postId]);
  
  const postComment = (event) => {
    event.preventDefault();
    const docref = doc(collection(db,'posts'),postId)
    console.log(user.displayName);
    addDoc(collection(docref,"comments"), {
      text: comment,
      username: user.displayName,
      timestamp: serverTimestamp(), 
    });
    setComment('');
  }
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar 
                className='post__avatar'
                alt={username}
                src='/static/images/avatar/1.jpg'/>
            <h3>{username}</h3>
        </div>
        
      <img className='post__image' src={ImageURL} />
      <h4 className='post__text'><strong>{username}:</strong> {caption}</h4>


      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {/* {user && ( */}
        <form className='post__commentBox'>
        <input 
          className='post__input'
          type="text"
          placeholder = "Add a comment.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button 
          className='post__button'
          disabled={!comment}
          type='submit'
          onClick={postComment}
        >
          Post
          
        </button>

      </form>
      {/* )} */}

      
    </div>

    
  )
}

export default Post;

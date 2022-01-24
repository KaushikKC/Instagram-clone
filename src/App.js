
import { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import {db, auth} from './firebase';
import {
  collection, onSnapshot, orderBy
} from 'firebase/firestore'
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { Input } from '@mui/material';
import { Button, } from '@mui/material';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 55,
  p: 4,
  px: 4,
  pb: 3,
};


function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user,setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {

        } else {
          return updateProfile(authUser,{
            displayName: username,
          });
        }
      } else {
        setUser(null);
      } 
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    onSnapshot(collection(db, 'posts'),orderBy('timestamp', 'desc'), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth,email, password)
    .then((authUser) => {
      return updateProfile(authUser.user,{
        displayName: username
      })
    })
    
    .catch((error) => alert(error.message));
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        
      >
        <Box sx={style}>
          <form className='app__signup'>
            <center>
              <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        
      >
        <Box sx={style}>
          <form className='app__signup'>
            <center>
              <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' />
            </center>
            
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>
      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' />
      

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>     
      )}
      </div>

      
      <div className='app__posts'>
        <div className='left-post'>
      {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} ImageURL={post.imageURL}/>
        ))
      }
        </div>
        <div className='right-post' >
          {/* <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        /> */}

        </div>

      </div>
      
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>Sorry you need to login to upload </h3>
      )}
      
    
      
    </div>
  );
}

export default App;


import { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import {db} from './firebase';
import {
  collection, onSnapshot
} from 'firebase/firestore'

function App() {
  const [postsData, setPosts] = useState([
    // { 
    //   username: "Kaushik", 
    //   caption: "this is awesome", 
    //   ImageURL: "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
    // },
    // {
    //   username: "Kaushik", 
    //   caption: "this is awesome", 
    //   ImageURL: "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
    // }
  ]);


  useEffect(() => {
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, []);
  return (
    <div className="App">
      

      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' />
      </div>
      <h1>HELLO</h1>

      {
        postsData.map(defpost => (
          <Post username={defpost.username} caption={defpost.caption} ImageURL={defpost.imageURL}/>
        ))
      }
    
      
    </div>
  );
}

export default App;

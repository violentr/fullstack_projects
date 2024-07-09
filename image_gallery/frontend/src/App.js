import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react'

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
const API_URL = process.env.REACT_APP_API_URL

const App = () => {
  const [word, setWord] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    console.log(word)
    fetch(`${API_URL}/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
     <Header title="Image Gallery"/>
     <Search word={word} setWord={setWord} handleSubmit={handleSubmitSearch}/>
    </div>
  );
}

export default App;

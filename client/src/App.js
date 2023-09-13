import { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/note-list';

function App() {

  const [categories, setCategories] = useState([])

  const [filterCategory, setFilterCategory] = useState()

  const getCategories = async() => {
      try {
          const response = await fetch("http://localhost:5000/categories");
          const jsonData = await response.json();
          setCategories(jsonData)
      } catch (err) {
          console.error(err.message);
      }
  };
    
  useEffect(() => {
    getCategories();
  }, []);


  return (
    <div className="App">
      <h1>My notes</h1>
      <div className='filter-bar'>
        <button onClick={() => setFilterCategory(undefined)}>All</button>
        {categories && categories.map((item, idx) => (
          <button key={idx} onClick={() => setFilterCategory(item.category)}>{item.category}</button>
        ))}
      </div>
      <NoteList filter={filterCategory}/>
    </div>
  )
};

export default App;

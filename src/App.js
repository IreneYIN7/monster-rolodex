import {useState, useEffect} from 'react'
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

function App(){
  console.log('render');
  const[monsters, setMonsters] = useState([]);
  const[search, setSearch] = useState('');
  const[filterMonsters, setFilterMonsters] = useState([]);
  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearch(searchFieldString);
  }
  // if we are fetching the API, we need to use the useEffect() 
  // to prevent the infinite re-render
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []
  )

  // We only want to change newFilteredMonsters whenever we change searchString or monsters.
  // use useEffect to avoid this situation where anything not relevant changes, it also re-render.
  // optimization
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(search);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, search])
  

  return(
    <div className="App">
      <h1 className = 'app-title'> Monster Rolodex</h1>
      <SearchBox 
        className = 'monster-search-box'
        onChangeHandler = {onSearchChange}
        placeholder = 'search monster'/>
      <CardList monsters={filterMonsters} />
    </div>
  );

}

export default App;

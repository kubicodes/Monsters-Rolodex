import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/searchbox/search-box.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchValue: '',
    };
  }

  fetchUserData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  };

  componentDidMount() {
    this.fetchUserData()
      .then(result => this.setState({ monsters: result }))
      .catch(err => console.error(err));
  }

  handleChangeOnSearchBox = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { monsters, searchValue } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search a Monster"
          handleChange={this.handleChangeOnSearchBox}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

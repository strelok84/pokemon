import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      color: { backgroundColor: "#000" },
      allname: [],
      searchName: "",
    };
    this.searchName = this.searchName.bind(this);
    this.searchBar = this.searchBar.bind(this);
  }

  handleClick(e, item) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/card",
      state: { pokemon: item },
    });
  }

  async handleClickAllName(e, item) {
    e.preventDefault();
    let reqPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${item.name}`
    );
    let pokemon = await reqPokemon.json();
    this.props.history.push({
      pathname: "/card",
      state: { pokemon: pokemon },
    });
  }

  changeColor(pokemonType) {
    switch (pokemonType) {
      case "grass":
        return { backgroundColor: "#00ff00" };
      case "normal":
        return { backgroundColor: "#c7bdbd" };
      case "fire":
        return { backgroundColor: "#e30909" };
      case "water":
        return { backgroundColor: "#091fe3" };
      case "fighting":
        return { backgroundColor: "#a35d48" };
      case "flying":
        return { backgroundColor: "#44a2c9" };
      case "poison":
        return { backgroundColor: "#7e44c9" };
      case "ground":
        return { backgroundColor: "#c4b41d" };
      case "rock":
        return { backgroundColor: "#b3ae89" };
      case "bug":
        return { backgroundColor: "#90b574" };
      case "ghost":
        return { backgroundColor: "#edf0f2" };
      case "electric":
        return { backgroundColor: "#fbff00" };
      case "psychic":
        return { backgroundColor: "#fb00ff" };
      case "ice":
        return { backgroundColor: "#0ff" };
      case "dark":
        return { backgroundColor: "#1c120b", color: "#fff" };
      case "dragon":
        return { backgroundColor: "#ff6a00" };
      case "steel":
        return { backgroundColor: "#a7d0d9" };
      case "fairy":
        return { backgroundColor: "#f274c8" };
      default:
        return { backgroundColor: "#000" };
    }
  }

  searchName(event) {
    this.setState({ searchName: event.target.value });
  }

  searchBar(event) {
    event.preventDefault();
    let table = document.getElementsByClassName("point");
    for (let i = 0; i < table.length; i++) {
      if (table[i].innerHTML === this.state.searchName) {
        console.log("CATCH");
        table[i].style.fontWeight = "bold";
        table[i].style.backgroundColor = "#808080";
        table[i].scrollIntoView();
      }
    }
  }

  async componentDidMount() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let random = getRandomInt(1, 908);

    const stableRandom =
      sessionStorage.getItem("random") ||
      sessionStorage.setItem("random", random);

    const allname = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`);
    const list = await allname.json();
    this.setState({
      allname: list.results,
    });

    for (
      let i = +stableRandom || random;
      i < (+stableRandom || random) + 90;
      i += 3
    ) {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const onePokemon = await pokemon.json();
      this.setState({
        pokemon: [...this.state.pokemon, onePokemon],
      });
    }
  }

  render() {
    return (
      <div className="box">
        <div className="menu">
          <div>Меню</div>
          <div>
            <form onSubmit={this.searchBar}>
              <input
                type="search"
                onChange={this.searchName}
                placeholder="Название"
              />
              <input type="submit" value="Найти" />
            </form>
          </div>

          {this.state.allname.map((item) => (
            <div
              className="point"
              key={item.id}
              href="./card"
              onClick={(e) => this.handleClickAllName(e, item)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="cardbox">
          {this.state.pokemon.map((item) => (
            <div
              className="card"
              key={item.id}
              style={this.changeColor(item.types[0].type.name)}
            >
              {item.name}
              <a href="./card" onClick={(e) => this.handleClick(e, item)}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                  alt={item.name}
                  width="100%"
                  title={item.types[0].type.name}
                ></img>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Main;

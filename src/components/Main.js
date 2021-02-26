import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      color: { backgroundColor: "#000" },
      allname:[]
    };
  }

  handleClick(e, item) {
    e.preventDefault();
    console.log(item);
    this.props.history.push({
      pathname: "/card",
      state: { pokemon: item },
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
        return { backgroundColor: "#1c120b",color:"#fff" };
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

  async componentDidMount() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let random = getRandomInt(1, 818);

    const allname=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`)
    const list=await allname.json();
    this.setState({
      allname:list.results
    })

    for (let i = random; i < random + 300; i += 3) {
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
          {this.state.allname.map((item)=>(<div>{item.name}</div>))}
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

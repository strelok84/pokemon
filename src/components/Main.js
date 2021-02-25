import React, { Component } from "react";
import Card from "./Card"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
    };
  }

  async componentDidMount() {
    for (let i = 1; i < 63; i+=3) {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const onePokemon = await pokemon.json();
      console.log(onePokemon);
      this.setState({
        pokemon: [...this.state.pokemon, onePokemon],
      });
    }
  }

  render() {
    return (
      <div>
        Список покемонов
        <div className="archive">
          {this.state.pokemon.map((item) => (
            <div className="card" key={item.id}>
              {item.name}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                alt={item.name}
                width="100%"
              ></img>
            </div>
          ))}
        </div>
       <Card pokemon={this.state.pokemon[0]}/>
      </div>
    );
  }
}

export default Main;

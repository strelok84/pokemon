import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      name:""
    };
  }

  

  render() {
    return (
      <div className="container">
        <div className="img item">
          <div className="name">{this.props.location.state.pokemon.name}</div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.location.state.pokemon.id}.png`}
            alt={this.props.location.state.pokemon.name}
            width="100%"
            height="100%"
            objectFit="cover"
          ></img>
        </div>
        <div className="properties item">
          {this.props.location.state.pokemon.weight}----
          {this.props.location.state.pokemon.height}
        </div>
        <div className="abilities item">
          {this.props.location.state.pokemon.abilities.map((item) => (
            <div>{item.ability.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Card;

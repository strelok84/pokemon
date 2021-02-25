import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
    };
  }

  render() {
    return (
      <div className="container">
           {this.props.pokemon.name}
        <div className="name">{this.props.pokemon.name}</div>
         <div className="img">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.pokemon.id}.png`}
            alt={this.props.pokemon.name}
            width="100%"
            height="100%"
            objectFit="cover"
          ></img>
        </div>
    <div className="properties">{this.props.pokemon.weight}----{this.props.pokemon.height}</div>
    <div className="abilities">{this.props.pokemon.abilities.map(item=>(<div>{item.ability.name}</div>))}</div> 
      </div>
    );
  }
}

export default Card;

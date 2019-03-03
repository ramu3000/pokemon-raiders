import React from "react";
import { Button } from "react-materialize";
import pokemonimage from "../../../assets/images/96.png";
import "./wizard.scss";

const Pokemon = ({ pokemon, tier, choose, chosen }) => {
  return (
    <li onClick={() => choose(pokemon)} className={chosen ? "active" : ""}>
      <img src={pokemonimage} alt="pokemon" />
      <span>{pokemon}</span>
      <span>tier:{tier}</span>
    </li>
  );
};

class ChoosePokemon extends React.Component {
  state = {
    pokemon: null
  };

  setPokemon = pokemon => {
    this.setState({ pokemon });
  };

  onSave = () => {
    this.props.saveRaid({ key: "boss", value: this.state.pokemon }, false);
  };

  render() {
    const { bossPool } = this.props;
    return (
      <div>
        <h2>Raid boss</h2>
        <ul className="pokemon__list">
          {bossPool.map(({ name, tier }) => (
            <Pokemon
              key={name}
              pokemon={name}
              chosen={this.state.pokemon === name}
              choose={this.setPokemon}
              tier={tier}
            />
          ))}
        </ul>
        <Button className="green" onClick={this.onSave}>
          Save raid
        </Button>
      </div>
    );
  }
}
export default ChoosePokemon;

/*
This is a comment
*/

const pikachu = {
  name: "Pikachu",
  height: 0.4,
  weight: 6,
  type: {
    primary: "Electric",
    secondary: "",
  },
  pokedexNo: 25,
  level: 24,
  levelUp: function () {
    this.level = this.level + 1;
  },
};

const test1 = `
    <ul>
        <li>Height: ${pikachu.height} m</li>
        <li>Weight: ${pikachu.weight} kg</li>
        <li>Pokedex Number: ${pikachu.pokedexNo}</li>
    </ul>
`;

const newPokemon = document.querySelector("#test1");

const pokemonStats = document.createElement("pikachuStats");
pokemonStats.innerHTML = test1;
newPokemon.append(pokemonStats);

class Pokemon {
  constructor(
    name,
    height,
    weight,
    typePrimary,
    typeSecondary,
    pokedexNo,
    level
  ) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.type = {
      primary: typePrimary,
      secondary: typeSecondary,
    };
    (this.pokedexNo = pokedexNo), (this.level = level);
  }
  levelUp() {
    this.level = this.level + 1;
  }
}

const charmander = new Pokemon("Charmander", 0.6, 8.5, "Fire", "", 4, 5);

const test2 = `
    <h3>${charmander.name}</h3>
    <ul>
        <li>Height: ${charmander.height} m</li>
        <li>Weight: ${charmander.weight} kg</li>
        <li>Pokedex Number: ${charmander.pokedexNo}</li>
    </ul>
`;

document.getElementById("test2").innerHTML = test2;

// console.log("This is Pikachu: ", pikachu)
// console.log("This is Charmander: ", charmander)

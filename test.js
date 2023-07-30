/*
This is a comment
*/

const carName = "Volvo";

// carName = "BMW";

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

document.getElementById("test").innerHTML = carName;

const test = `
    <h3>${charmander.name}</h3>
    <ul>
        <li>Height: ${charmander.height} m</li>
        <li>Weight: ${charmander.weight} kg</li>
        <li>Pokedex Number: ${charmander.pokedexNo}</li>
    </ul>
`;

document.getElementById("test2").innerHTML = test;

const test2 = `
    <ul>
        <li>Height: ${pikachu.height} m</li>
        <li>Weight: ${pikachu.weight} kg</li>
        <li>Pokedex Number: ${pikachu.pokedexNo}</li>
    </ul>
`;

const newPokemon = document.querySelector("#test3");

const pokemonStats = document.createElement("pikachuStats");
pokemonStats.innerHTML = test2;
newPokemon.append(pokemonStats);

// console.log("This is Pikachu: ", pikachu)
// console.log("This is Charmander: ", charmander)

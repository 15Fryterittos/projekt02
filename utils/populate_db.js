import fishy from "../models/fishy.js";

const species_data = {
  "slodkowodne": {
    name: "Ryby słodkowodne",
    fishes: [
      { name: "Karp", description: "Ryba z rodziny karpiowatych, charakteryzująca się masywnym, bocznie spłaszczonym ciałem pokrytym dużymi, płaskimi łuskami oraz grubym pyskiem z dwiema parami wąsów", habitat: "stawy, rzeki"},
      { name: "Szczupak", description: "Drapieżna ryba o wydłużonym, spłaszczonym ciele i charakterystycznej wydłużonej głowie przypominającej dziób kaczki", habitat: "jeziora, rzeki"},
    ],
  },
  "morskie": {
    name: "Ryby morskie",
    fishes: [
      { name: "Dorsz", description: "Wydłużona ryba o dużej głowie, z trzema płetwami grzbietowymi i dwiema odbytowymi. Ubarwienie jest zmienne (od zielonkawego po brązowawy grzbiet, jasne boki i biały brzuch), a na podbródku ma charakterystyczny, pojedynczy wąs", habitat: "morza (zimne)"},
      { name: "Tuńczyk", description: "Duża, okoniokształtna ryba z opływowym, torpedowatym ciałem, przystosowanym do szybkiego pływania. Charakteryzuje się ciemnoniebieskim grzbietem i srebrzystobiałym brzuchem, a także charakterystyczną, wciętą płetwą ogonową w kształcie półksiężyca", habitat: "oceany"},
    ],
  },
};

console.log("Dodawanie ryb...");

Object.entries(species_data).forEach(([id, data]) => {
  const species = fishy.addSpecies(id, data.name);
  console.log("Utworzono gatunek:", species);
  for (let fish of data.fishes) {
    const f = fishy.addFish(species.id, fish);
    console.log("Dodano rybę:", f);
  }
});
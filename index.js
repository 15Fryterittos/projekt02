import express from "express";
import morgan from "morgan";
import fishy from "./models/fishy.js";

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/fish", (req, res) => {
  const species = fishy.getSpeciesSummaries();
  res.render("species", { title: "Gatunki ryb", species });
});

app.get("/fish/:species_id", (req, res) => {
  const { species_id } = req.params;
  const species = fishy.getSpecies(species_id);

  if (!species) return res.sendStatus(404);
  res.render("species_list", { title: species.name, species });
});

app.post("/fish/:species_id/new", (req, res) => {
  const { species_id } = req.params;
  const { name, description, habitat } = req.body;

  if (!fishy.hasSpecies(species_id)) return res.sendStatus(404);

  const newFish = { name, description, habitat };
  const errors = fishy.validateFishData(newFish);

  if (errors.length > 0) {
    res.status(400).render("new_fish", {
      title: "Nowa ryba",
      errors,
      species: { id: species_id },
      ...newFish,
    });
  } else {
    fishy.addFish(species_id, newFish);
    res.redirect(`/fish/${species_id}`);
  }
});

app.listen(port, () => {
  console.log(`Serwer działa: http://localhost:${port}`);
});
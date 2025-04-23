const express = require("express");
const PetValidator = require("./validation/petValidator");
const JsonHelper = require("./utils/jsonHelper");

const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const petsFilePath = path.join(__dirname, "/pets.json");

const app = express();
const PORT = process.env.PORT || 3000;
const dataStore = [];
const apiName = "pet";
const baseRoute = `/api/${apiName}`;

app.use(cors());
app.use(express.json());
app.get(`${baseRoute}`, (req, res) => {
  const allPets = JsonHelper.readPetsFromFile(petsFilePath);
  return res.status(200).json({
    pets: allPets,
  });
});
app.get(`${baseRoute}/cats`, (req, res) => {
  const allPets = JsonHelper.readPetsFromFile(petsFilePath);

  const cats = allPets.filter((pet) => pet.type === "cat");
  return res.status(200).json({
    pets: cats,
  });
});
app.get(`${baseRoute}/dogs`, (req, res) => {
  const allPets = JsonHelper.readPetsFromFile(petsFilePath);

  const dogs = allPets.filter((pet) => pet.type === "dog");
  return res.status(200).json({
    pets: dogs,
  });
});
app.get(`${baseRoute}/:id`, (req, res) => {
  const id = req.params.id;
  const allPets = JsonHelper.readPetsFromFile(petsFilePath);

  const searchedPetIndex = allPets.findIndex((pet) => pet.id === id);

  if (searchedPetIndex === -1) {
    res.status(400).json({
      message: `No pet with id ${id} found.`,
      pet: {},
    });
  }

  return res.status(200).json({
    pet: allPets[searchedPetIndex],
  });
});
app.get(`${baseRoute}`, (req, res) => {
  res.json(dataStore);
});
app.post(`${baseRoute}`, (req, res) => {
  try {
    const pet = req.body;

    const { message, isValid } = PetValidator.isValidPet(pet);

    if (!isValid) {
      res.status(400).json({
        message,
        pet,
      });
    }

    const pets = JsonHelper.readPetsFromFile(petsFilePath);

    // Assign a unique UUID to the pet
    const newID = uuidv4();
    const newPet = { ...pet, id: newID };
    JsonHelper.writePetsToFile(petsFilePath, [...pets, newPet]);

    // Store the received pet data
    res.status(201).json({
      message: "Pet data received successfully!",
      receivedPet: newPet,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.delete(`${baseRoute}/:id`, (req, res) => {
  const id = req.params.id;
  const pets = JsonHelper.readPetsFromFile(petsFilePath);
  const petIndex = pets.findIndex((pet) => pet.id === id);

  console.log("petsInDelete", pets);
  if (petIndex === -1) {
    return res.status(404).json({ message: "Pet not found!" });
  }

  const updatedPets = pets.filter((pet) => pet.id !== id);

  JsonHelper.writePetsToFile(petsFilePath, updatedPets);
  res.json({
    message: "Pet data deleted successfully!",
    pets: updatedPets,
  });
});
app.put(`${baseRoute}/:id`, (req, res) => {
  const id = req.params.id;

  const pets = JsonHelper.readPetsFromFile(petsFilePath);
  const petIndex = pets.findIndex((pet) => pet.id === id);

  if (petIndex === -1) {
    return res.status(404).json({ message: "Pet not found!" });
  }

  const newPet = req.body;

  const { isValid, message } = PetValidator.isValidPet(newPet);

  // Validate required fields
  if (!isValid) {
    return res.status(400).json({ message, pet });
  }

  const updatedPets = pets.map((pet, idx) => {
    if (petIndex === idx) {
      return { ...newPet, id: pet.id };
    }
    return pet;
  });
  // Update the pet data at the specified index
  JsonHelper.writePetsToFile(petsFilePath, updatedPets);
  res.json({
    message: "Pet data updated successfully!",
    updatedPet: dataStore[petIndex],
  });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

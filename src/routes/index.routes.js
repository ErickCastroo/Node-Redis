import { Router } from "express";
import { client } from "../db/conection.js";

const router = Router();

//___________________________________________________________
//Pedir todos los personajes de la serie Rick and Morty
//___________________________________________________________

router.get("/personajes", async (req, res) => {

  // GET /personajes desde la cache con redis
  client.get("personajes", (err, reply) => {
    if (reply) {
      return res.json(JSON.parse(reply));
    } else {
      console.log(err);
    }
  });

  //si no hay datos en la cache, se hace la peticion a la API y se guarda en la cache con redis
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  client.set("personajes", JSON.stringify(data), (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
  res.json(data);
});

//___________________________________________________________
//Pedir un personaje de la serie Rick and Morty por ID
//___________________________________________________________

router.get("/personaje/:id", async (req, res) => {
  // GET /personaje desde la cache con redis
  client.get("personaje", (err, reply) => {
    if (reply) {
      return res.json(JSON.parse(reply));
    } else {
      console.log(err);
    }
  });

  //si no hay datos en la cache, se hace la peticion a la API y se guarda en la cache con redis
  const { id } = req.params;
  const reponse = await fetch(
    "https://rickandmortyapi.com/api/character/" + id
  );
  const data = await reponse.json();

  client.set("personaje", JSON.stringify(data), (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
  res.json(data);
});

export { router };
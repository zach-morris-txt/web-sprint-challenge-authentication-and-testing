//Imports
const db = require('../../data/dbConfig')


//DATABASE FUNCTIONS
async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findBy(filter) {
  return db("users as u")
    .select("u.id", "u.username", "u.password")
    .where(filter);
}

function findById(id) {
  return db("users as u")
    .select("u.id", "u.username", "u.password")
    .where("u.id", id)
    .first();
}


//Exports; Exposing
module.exports = {
    add,
    findBy,
    findById,
}
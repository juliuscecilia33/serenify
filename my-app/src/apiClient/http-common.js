import axios from "axios";

//create an instance using axio.creat(config)
const instance = axios.create({
  baseURL: "http://localhost:3005/",
  headers: {
    "Content-type": "application/json"
  }
});
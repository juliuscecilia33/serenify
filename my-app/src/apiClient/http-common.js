import axios from "axios";

//create an instance using axio.creat(config)
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKENDURL,
  headers: {
    "Content-type": "application/json",
  },
});

import axios from "axios";

//create an instance using axio.creat(config)
const instance = axios.create({
  baseURL: "http://localhost:3005/",
});

instance.defaults.headers.common["Content_Type"] = "application/json";
//transformJSONResponse
instance.defaults.transformResponse = [(data) => {
  let transformData;
  try {
    transformData = JSON.parse(data);
  } catch {
    console.log("This data is not JSON!");
    transformData = data;
  }
  return transformData;
}];

export default instance;
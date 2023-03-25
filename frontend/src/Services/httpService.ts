import axios from "axios";
import { ICategory } from "../Types/ICategory";

export class httpService {
  getCategories(): Promise<ICategory[] | null> {
    return axios
      .get<ICategory[]>("http://localhost:8080/fdipardy/api/themas")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
        return null;
      });
  }

  getAnswers() {
    axios
      .get("http://localhost:8080/fdipardy/api/answers")
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  }
}

import axios from "axios";
import { IAnswer } from "../Types/IAnswer";
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

  getAnswers(): Promise<IAnswer[] | null> {
    return axios
      .get<IAnswer[]>("http://localhost:8080/fdipardy/api/answers")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
        return null;
      });
  }
}

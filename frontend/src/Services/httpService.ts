import axios from "axios";

export class httpService {
  getCategories() {
    axios
      .get("http://localhost:8080/fdipardy/api/themas")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  getQuestions() {
    axios
      .get("http://localhost:8080/fdipardy/api/questions")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  getAnswers() {
    axios
      .get("http://localhost:8080/fdipardy/api/answers")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

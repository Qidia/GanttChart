import db from "../../../db.json"; // Импорт данных из db.json

export default function handler(req, res) {
  res.status(200).json(db.departments); // Отправка данных из db.json в ответ на запрос
}

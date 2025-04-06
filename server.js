// Импортируем библиотеку express для создания сервера
const express = require('express');

// Создаем экземпляр приложения
const app = express();

// Устанавливаем порт для сервера
const port = 80;

// Настроим сервер на отдачу статических файлов из директории 'frontend/dist'
// Это позволяет приложению обслуживать файлы, такие как HTML, CSS, JavaScript и другие статические ресурсы.
app.use(express.static('frontend/dist'));

// Настроим сервер на прослушивание указанного порта (80) и выведем сообщение в консоль о запуске сервера.
app.listen(port, () => console.log('Server has been started'));
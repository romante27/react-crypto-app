// Импортируем необходимые компоненты и функции из библиотек
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'; // Компонент для отображения диаграммы
import { useCrypto } from '../context/crypto-context'; // Контекст для доступа к данным о криптовалютах

// 
// ChartJS.register — регистрирует необходимые элементы (ArcElement для круговой диаграммы, Tooltip для всплывающих подсказок и Legend для легенды).
// data — содержит метки (названия активов) и данные (суммарные стоимости активов).
// backgroundColor — массив цветов для каждого сегмента диаграммы.
// Pie — отображает круговую диаграмму с подготовленными данными.

// Регистрируем необходимые элементы для работы с Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  // Получаем активы из контекста
  const { assets } = useCrypto();

  // Подготавливаем данные для диаграммы
  const data = {
    labels: assets.map((a) => a.name), // Массив с названиями активов
    datasets: [
      {
        label: '', // Метка (не используется в этом случае)
        data: assets.map((a) => a.totalAmount), // Массив с суммарными значениями для каждого актива
        backgroundColor: [ // Цвета для каждого сегмента диаграммы
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex', // Центрируем диаграмму
        marginBottom: '1rem', // Отступ снизу
        justifyContent: 'center', // Горизонтальное выравнивание
        height: 400, // Устанавливаем высоту диаграммы
      }}
    >
      {/* Отображаем круговую диаграмму (Pie chart) */}
      <Pie data={data} />
    </div>
  );
}
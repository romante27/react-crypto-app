// Импортируем компонент таблицы из Ant Design и контекст
import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';

// Определяем колонки таблицы
const columns = [
  {
    title: 'Name', // Заголовок колонки
    dataIndex: 'name', // Связь с полем объекта данных
    showSorterTooltip: { target: 'full-header' }, // Отображение подсказки при сортировке
    sorter: (a, b) => a.name.length - b.name.length, // Сортировка по длине названия
    sortDirections: ['descend'], // Направление сортировки по умолчанию
  },
  {
    title: 'Price, $', // Заголовок колонки
    dataIndex: 'price', // Связь с полем цены
    defaultSortOrder: 'descend', // По умолчанию сортируем по убыванию
    sorter: (a, b) => a.price - b.price, // Сортировка по цене
  },
  {
    title: 'Amount', // Заголовок колонки
    dataIndex: 'amount', // Связь с полем количества
    defaultSortOrder: 'descend', // Сортировка по убыванию
    sorter: (a, b) => a.amount - b.amount, // Сортировка по количеству
  },
];

export default function AssetsTable() {
  // Получаем список активов из контекста
  const { assets } = useCrypto();

  // Преобразуем данные в формат, удобный для таблицы
  const data = assets.map((a) => ({
    key: a.id, // Уникальный ключ для React
    name: a.name, // Название актива
    price: a.price, // Цена актива
    amount: a.amount, // Количество актива
  }));

  return (
    <div>
      {/* Отображаем таблицу с данными */}
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
}
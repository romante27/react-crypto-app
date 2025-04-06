// Импорт необходимых компонентов и контекста
import { Layout, Typography } from 'antd';
import { useCrypto } from '../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';

// Стили для контейнера контента
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)', // Высота за вычетом хедера
  color: '#fff',
  backgroundColor: '#101529', // Темный фон
  padding: '1rem',
};

export default function AppContent() {
  // Получаем список активов и криптовалют из контекста
  const { assets, crypto } = useCrypto();

  // Создаём объект, где ключ — id криптовалюты, а значение — её цена
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      {/* Заголовок с общей стоимостью портфеля */}
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio {' '}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id]) // Рассчитываем стоимость каждого актива
          .reduce((acc, v) => acc + v, 0) // Суммируем все значения
          .toFixed(2)}$ {/* Округляем до 2 знаков после запятой */}
      </Typography.Title>

      {/* График динамики портфеля */}
      <PortfolioChart />

      {/* Таблица с активами */}
      <AssetsTable />
    </Layout.Content>
  );
}
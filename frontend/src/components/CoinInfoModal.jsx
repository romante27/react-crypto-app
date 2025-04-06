import { Flex, Typography, Tag, Divider } from "antd"; // Импорт компонентов из Ant Design
import CoinInfo from "../components/CoinInfo"; // Импорт компонента CoinInfo для отображения информации о монете

export function CoinInfoModal({ coin }) {
  return (
    <>
      {/* Отображение основной информации о монете */}
      <CoinInfo coin={coin} withSymbol />
      <Divider /> {/* Разделитель */}

      {/* Отображение изменения цены за разные промежутки времени */}
      <Typography.Paragraph>
        <Typography.Text strong>1 hour</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        
        <Typography.Text strong>1 day</Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
        
        <Typography.Text strong>1 week</Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>

      {/* Отображение текущей цены */}
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$ {/* Округляем цену до 2 знаков после запятой */}
      </Typography.Paragraph>

      {/* Цена в биткоинах */}
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      {/* Рыночная капитализация */}
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>

      {/* Отображение адреса контракта, если он есть */}
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}
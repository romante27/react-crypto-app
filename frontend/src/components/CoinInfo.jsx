import { Flex, Typography } from "antd"; // Импорт компонентов Flex и Typography из Ant Design

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      {/* Отображение иконки криптовалюты */}
      <img 
        src={coin.icon} // URL иконки монеты
        alt={coin.name} // Альтернативный текст — название монеты
        style={{ width: 40, marginRight: 10 }} // Размер иконки и отступ справа
      />

      {/* Название криптовалюты и (опционально) символ */}
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {/* Если withSymbol === true, отображаем символ монеты */}
        {coin.name} {/* Название монеты */}
      </Typography.Title>
    </Flex>
  );
}
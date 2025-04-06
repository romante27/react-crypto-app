import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../utils"; // Импорт утилиты для капитализации строк
import { useContext } from "react";
import CryptoContext from "../context/crypto-context"; // Импорт контекста криптовалют

// Стили для боковой панели
const siderStyle = {
  padding: "1rem",
};

// Компонент боковой панели, отображающий список активов пользователя
export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext); // Получение списка активов из контекста

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}> {/* Карточка для каждого актива */}
          <Statistic
            title={capitalize(asset.id)} // Заголовок карточки с капитализацией id
            value={asset.totalAmount} // Общая стоимость актива
            precision={2} // Количество знаков после запятой
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }} // Цвет текста в зависимости от роста цены
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} // Значок изменения цены
            suffix="$" // Отображение валюты
          />
          {/* Список характеристик актива */}
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit, widthTag: true }, // Общая прибыль
              { title: "Asset Amount", value: asset.amount, isPlain: true }, // Количество актива
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span> {/* Название характеристики */}
                <span>
                    {/* Если у характеристики есть тег (например, Total Profit), отображаем его */}
                    {item.widthTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}% {/* Процентное изменение цены актива */}
                    </Tag>
                    )}

                    {/* Если характеристика является простым числом (например, количество актива), просто отображаем значение */}
                    {item.isPlain && item.value}

                    {/* Если характеристика не является простым числом, форматируем её как валюту */}
                    {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$ {/* Округляем до 2 знаков после запятой и добавляем $ */}
                    </Typography.Text>
                    )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
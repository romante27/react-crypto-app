// AddAssetForm.jsx
import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

// Объект для сообщений об ошибках валидации формы
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm(); // Создание формы
  const { crypto, addAsset } = useCrypto(); // Получение данных о криптовалютах и функции добавления актива
  const [coin, setCoin] = useState(null); // Хранение выбранной криптовалюты
  const [submitted, setSubmitted] = useState(false); // Состояние для отображения результата
  const assetRef = useRef(); // Реф для хранения данных о новом активе

  // Если форма отправлена, показываем сообщение об успехе
  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  // Если криптовалюта не выбрана, отображаем селект для выбора
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }} // Устанавливаем ширину выпадающего списка
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))} // Устанавливаем выбранную криптовалюту
        placeholder="Select coin" // Текст-подсказка
        options={crypto.map((coin) => ({
          label: coin.name, // Название монеты
          value: coin.id, // ID монеты
          icon: coin.icon, // Иконка монеты
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }} // Устанавливаем ширину иконки
              src={option.data.icon} // Подключаем изображение
              alt={option.data.label} // Альтернативный текст
            />
            {option.data.label} // Отображаем название монеты
          </Space>
        )}
      />
    );
  }

  // Обработчик отправки формы
  function onFinish(values) {
    const newAsset = {
      id: coin.id, // ID монеты
      amount: values.amount, // Количество монет
      price: values.price, // Цена за монету
      date: values.date ?.$d ?? new Date(), // Дата покупки (текущая, если не выбрана)
    };
    assetRef.current = newAsset; // Сохранение данных в реф
    setSubmitted(true); // Установка состояния отправки
    addAsset(newAsset); // Добавление нового актива
  }

  // Обновление общей суммы при изменении количества
  function handleAmountChange(value) {
    const price = form.getFieldValue("price"); // Получаем текущую цену
    form.setFieldsValue({
      total: +(value * price).toFixed(2), // Обновляем сумму с округлением до 2 знаков
    });
  }

  // Обновление общей суммы при изменении цены
  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount"); // Получаем текущее количество
    form.setFieldsValue({
      total: +(value * amount).toFixed(2), // Обновляем сумму с округлением до 2 знаков
    });
  }

  return (
    <Form
      form={form} // Подключаем форму
      name="basic"
      labelCol={{ span: 4 }} // Устанавливаем ширину метки
      wrapperCol={{ span: 10 }} // Устанавливаем ширину поля ввода
      style={{ maxWidth: 600 }} // Устанавливаем максимальную ширину формы
      initialValues={{
        price: +coin.price.toFixed(2), // Начальная цена — округленная до 2 знаков
      }}
      onFinish={onFinish} // Функция обработки отправки формы
      validateMessages={validateMessages} // Подключаем валидацию
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item label="Amount" name="amount" rules={[{ required: true, type: "number", min: 0 }]}> 
        <InputNumber placeholder="Enter coin" onChange={handleAmountChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Add Asset</Button>
      </Form.Item>
    </Form>
  );
}

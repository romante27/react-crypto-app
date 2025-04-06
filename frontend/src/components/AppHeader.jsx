// AppHeader.jsx
import { Layout, Select, Space, Button, Modal, Drawer } from "antd"; // Импорт компонентов Ant Design
import { useCrypto } from "../context/crypto-context"; // Импорт хука для работы с криптовалютами
import { useEffect, useState } from "react"; // Импорт хуков состояния и эффекта
import { CoinInfoModal } from "../components/CoinInfoModal"; // Импорт модального окна с информацией о монете
import AddAssetForm from "./AddAssetForm"; // Импорт формы добавления актива

// Стили для заголовка
const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  // Состояние для управления открытием селекта
  const [select, setSelect] = useState(false);
  // Состояние для хранения выбранной криптовалюты
  const [coin, setCoin] = useState(null);
  // Состояние для управления открытием боковой панели (drawer)
  const [drawer, setDrawer] = useState(false);
  // Состояние для управления открытием модального окна
  const [modal, setModal] = useState(false);
  // Доступ к данным криптовалют из контекста
  const { crypto } = useCrypto();

  // Эффект для обработки нажатия клавиши "/"
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev); // Переключение состояния селекта
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress); // Очистка обработчика при размонтировании
  }, []);

  // Функция обработки выбора криптовалюты в селекте
  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value)); // Находим выбранную монету
    setModal(true); // Открываем модальное окно
  }

  return (
    <Layout.Header style={headerStyle}>
      {/* Селект для выбора криптовалюты */}
      <Select
        style={{ width: 250 }}
        open={select} // Открытие/закрытие селекта
        onSelect={handleSelect} // Обработчик выбора монеты
        onClick={() => setSelect((prev) => !prev)} // Переключение селекта при клике
        value="press / to open" // Текст в поле выбора
        options={crypto.map((coin) => ({
          label: coin.name, // Название криптовалюты
          value: coin.id, // ID криптовалюты
          icon: coin.icon, // Иконка криптовалюты
        }))}
        optionRender={(option) => (
          <Space>
            {/* Отображение иконки криптовалюты в выпадающем списке */}
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />

      {/* Кнопка открытия формы добавления актива */}
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      {/* Модальное окно с информацией о выбранной криптовалюте */}
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      {/* Боковая панель (drawer) с формой добавления актива */}
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose // Удаление содержимого при закрытии
      >
        {/* Форма добавления актива */}
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
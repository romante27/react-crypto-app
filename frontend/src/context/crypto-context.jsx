import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCrypto, fetchAssets } from "../components/api"; // Импорт функций для получения данных о криптовалютах и активах
import { percentDifference } from "../utils"; // Импорт утилиты для вычисления процентной разницы

// Создание контекста для управления данными о криптовалютах и активах
const CryptoContext = createContext({
  assets: [], // Список активов пользователя
  crypto: [], // Доступные криптовалюты
  loading: false, // Флаг загрузки данных
});

// Провайдер контекста
export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false); // Состояние загрузки данных
  const [crypto, setCrypto] = useState([]); // Состояние списка криптовалют
  const [assets, setAssets] = useState([]); // Состояние активов пользователя

  // Функция для преобразования списка активов
  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id); // Находим монету, соответствующую активу
      return {
        grow: asset.price < coin.price, // Определяем, выросла ли цена актива
        growPercent: percentDifference(asset.price, coin.price), // Вычисляем процентную разницу
        totalAmount: asset.amount * coin.price, // Общая стоимость актива
        totalProfit: asset.amount * coin.price - asset.amount * asset.price, // Прибыль от актива
        name: coin.name, // Название криптовалюты
        ...asset, // Добавляем остальные данные актива
      };
    });
  }

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    async function preload() {
      setLoading(true); // Устанавливаем флаг загрузки
      const { result } = await fakeFetchCrypto(); // Получаем список криптовалют
      const assets = await fetchAssets(); // Получаем активы пользователя

      setAssets(mapAssets(assets, result)); // Обновляем список активов с перерасчетом данных
      setCrypto(result); // Устанавливаем криптовалюты
      setLoading(false); // Сбрасываем флаг загрузки
    }
    preload();
  }, []);

  // Функция для добавления нового актива
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto)); // Обновляем список активов с учетом новых данных
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children} {/* Передаем данные контекста в дочерние компоненты */}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

// Кастомный хук для использования контекста
export function useCrypto() {
  return useContext(CryptoContext);
}
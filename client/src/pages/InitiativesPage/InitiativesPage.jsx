import { useEffect, useState } from 'react';
import InitiativesList from '../../widgets/InitiativesList/InitiativesList';
import InitiativeForm from '../../widgets/InitiativeForm/InitiativeForm';
import { message as antMessage } from 'antd'; //! импорт сообщения из antd с переименованием в antMessage
import InitiativeApi from '../../entities/initiative/InitiativeApi'; //! импорт класса InitiativeApi, с помощью него будем делать запросы

export default function InitiativesPage({ user }) {
  const [initiatives, setInitiatives] = useState([]); //* стейт под все задачи
  const [loading, setLoading] = useState(false); //* стейт под состояние загрузки
  // const [error, setError] = useState(null); //! пример стейта под состояние ошибки

  const loadInitiatives = async () => {
    setLoading(true); //! включаем загрузку данных
    try {
      const { data, message, error, statusCode } = await InitiativeApi.getInitiatives(); //! получаем данные от класса
      // const { data, message, error, statusCode } = await response.json();
      if (error) {
        //! если ошибка пришла с бэка
        // setError(error);
        antMessage.error(error); //! то выводим её пользователю
        return; //! и выходим из функции
      }
      antMessage.success(message); //! в любом случае показываем сообщение пользователю
      if (statusCode === 200) {
        //! если все прошло успешно и статус нужный
        setInitiatives(data); //! то записываем данные в стейт
      }
    } catch (error) {
      //! если упали непредсказуемо
      antMessage.error(error.message); //! уведомляем пользователя
      console.log(error); //! и логируем для нас ошибку
    } finally {
      //! в любом случае выключаем загрузку
      antMessage.info('Загрузка завершена');
      setLoading(false);
    }
  };

  // useEffect(() => {}); //! следит вообще за всем
  // useEffect(() => {}, []); //! отработает на этапе монтирования
  // useEffect(() => {}, [count]); //!  отработает на этапе монтирования и при изменении count

  //* V3 - подгружаем данные по задачам на этапе монтирования компонента в DOM
  useEffect(() => {
    loadInitiatives();
  }, []);

  //! Пример выключения сообщения об ошибке через 3 секунды
  // useEffect(() => {
  //   if (error) {
  //     const timer = setTimeout(() => {
  //       setError(null);
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [error]); //! здесь пример эффекта с массивом зависимостей

  //! Если загрузка есть, выводим сообщение, чтобы избежать моргания верстки(можете попробовать подрубить лоадер или спиннер из antd)
  return (
    <div>
      {loading && <h3>Загрузка...</h3>}
      {/* {error && <h3 style={{ color: 'red' }}>{error}</h3>} */}
      {user && <InitiativeForm setInitiatives={setInitiatives} setLoading={setLoading} />}
      <InitiativesList initiatives={initiatives} setInitiatives={setInitiatives} user={user} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import InitiativesList from '../../widgets/InitiativesList/InitiativesList';
import InitiativeForm from '../../widgets/InitiativeForm/InitiativeForm';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';

export default function InitiativesPage({ user }) {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInitiatives = async () => {
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await InitiativeApi.getInitiatives();
      if (error) {

        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setInitiatives(data);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      antMessage.info('Загрузка завершена');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitiatives();
  }, []);

  

  return (
    <div>
      {loading && <h3>Загрузка...</h3>}
      {/* {error && <h3 style={{ color: 'red' }}>{error}</h3>} */}
      {<InitiativeForm setInitiatives={setInitiatives} setLoading={setLoading} />}
      <InitiativesList initiatives={initiatives} setInitiatives={setInitiatives} user={user} />
    </div>
  );
}

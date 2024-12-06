/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import InitiativesList from '../../widgets/InitiativesList/InitiativesList';
import InitiativeForm from '../../widgets/InitiativeForm/InitiativeForm';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';
import Dropdown from '../../widgets/Dropdown/Dropdown';

export default function InitiativesPage({ user }) {
  const [initiatives, setInitiatives] = useState([]);
  const [viewInit, setViewInit] = useState(initiatives);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadInitiatives();
  }, []);

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
        setViewInit(data);
      }

    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      antMessage.info('Загрузка завершена');
      setLoading(false);
    }
  };


  console.log("page22",initiatives);
  

  return (
    <div>
    <Dropdown setViewInit={setViewInit} viewInit={viewInit} initiatives={initiatives}/>
      {loading && <h3>Загрузка...</h3>}
      {<InitiativeForm setInitiatives={setInitiatives}  setViewInit={setViewInit} setLoading={setLoading} />}
      <InitiativesList initiatives={viewInit} setInitiatives={setInitiatives} user={user} setViewInit={setViewInit} />
    </div>
  );
}

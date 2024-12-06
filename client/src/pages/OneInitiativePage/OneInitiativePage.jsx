import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InitiativeApi from "../../entities/initiative/InitiativeApi";
import { message as antMessage } from "antd";

export default function OneInitiativePage() {
  const { id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  const myStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '14px',
    // color: 'blue',
    // backgroundColor: 'lightgray',
  };

  const my2Style = {
    display: 'flex',
    flexDirection: 'column',
    padding: '14px',
  };

  useEffect(() => {
    InitiativeApi.getInitiativeById(+id)
      .then(({ statusCode, data, error, message }) => {
        if (error) {
          antMessage.error(error);
          return;
        }
        antMessage.success(message);
        if (statusCode === 200) {
          setInitiative(data);
        }
      })
      .catch((err) => {
        console.log(err);
        antMessage.error(err.message);
      })
      .finally(() => {
        antMessage.info("Загрузка завершена");
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading && <h3>Загрузка...</h3>}
      <div style={myStyle}><h2>{initiative && <div>{initiative.title}</div>}</h2></div>
      <div style={my2Style}>Уровень инициативы:
      {initiative && <div>{initiative.level}</div>}</div>
      <div style={my2Style}>{initiative && <div>{initiative.content}</div>}</div>
    </div>
  );
}

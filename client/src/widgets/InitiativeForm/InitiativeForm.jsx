import styles from "./InitiativeForm.module.css";
import { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import { message as antMessage } from "antd";
import InitiativeApi from "../../entities/initiative/InitiativeApi";

export default function InitiativeForm({ setInitiatives, setLoading }) {
  const [inputs, setInputs] = useState({ title: "", content: "", level: "" });

  function onChangeHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const isEmptyFormData =
    inputs.title.trim().length === 0 ||
    inputs.content.trim().length === 0 ||
    inputs.level.trim().length === 0;

  async function createInitiativeHandler() {    
    if (isEmptyFormData) {
      antMessage.error("Все поля обязательны к заполнению");
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } =
        await InitiativeApi.createInitiative(inputs);
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 201) {
        setInitiatives((prev) => [...prev, data]);
        setInputs({ title: "", content: "", level: "" });
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input className={styles.input} value={inputs.title} name="title" placeholder="Заголовок" onChange={onChangeHandler} />
      <input className={styles.input} value={inputs.content} name="content" placeholder="Содержание" onChange={onChangeHandler} />
      <input className={styles.input} value={inputs.level} name="level" placeholder="Округ" onChange={onChangeHandler} />
      <Button
        text="Создать"
        color="#1a1a68"
        onClick={createInitiativeHandler}
        disabled={isEmptyFormData}
      />
    </div>
  );
}

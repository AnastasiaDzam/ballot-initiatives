import React, { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import { message as antMessage } from "antd";
import InitiativeApi from "../../entities/initiative/InitiativeApi";

export default function InitiativeUpdateForm({
  user,
  initiative,
  setInitiatives,
  setLoading,
  setShowUpdateForm,
}) {
  const [inputs, setInputs] = useState({
    title: initiative?.title,
    content: initiative?.content,
    level: initiative?.level,
  });

  const isEmptyFormData =
    inputs.title.trim().length === 0 ||
    inputs.content.trim().length === 0 ||
    inputs.level.trim().length === 0;

  function changeInputsHandler({ target }) {
    const { value, name } = target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function sendUpdatedInitiative() {
    if (user.id !== initiative?.user_id) {
      antMessage.error(
        `No rights to update initiative with id ${initiative?.id}`
      );
      return;
    }
    if (isEmptyFormData) {
      antMessage.error("Все поля обязательны к заполнению");
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } =
        await InitiativeApi.updateInitiativeById(initiative.id, inputs);
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setInitiatives((prev) =>
          prev.map((el) => (el.id === data.id ? data : el))
        );
        setInputs({ title: "", content: "", level: "" });
        setShowUpdateForm(false);
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
      <input
        name="title"
        value={inputs.title}
        placeholder="title"
        onChange={changeInputsHandler}
      />
      <input
        name="content"
        value={inputs.content}
        placeholder="content"
        onChange={changeInputsHandler}
      />
      <input
        name="level"
        value={inputs.level}
        placeholder="level"
        onChange={changeInputsHandler}
      />
      <Button text="Сохранить" onClick={sendUpdatedInitiative} />
    </div>
  );
}

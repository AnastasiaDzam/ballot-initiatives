import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskApi from "../../entities/task/TaskApi";
import { axiosRequest } from "../../shared/lib/axiosInstance";
import { message as antMessage } from "antd";

export default function OneTaskPage({
  user,
  initiative,
  setInitiatives,
  initiatives,
  flag,
}) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(flag);

  useEffect(() => {
    InitiativesApi.getTaskById(+id)
      .then(({ statusCode, data, error, message }) => {
        if (error) {
          antMessage.error(error);
          return;
        }
        antMessage.success(message);
        if (statusCode === 200) {
          setTask(data);
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

  const voteInitiative = async () => {
    const { data } = await axiosRequest.post(`/initiative`, {
      user_id: user.id,
      initiative_id: initiative.id,
    });

    if (data.message === "success") {
      setInitiatives((prev) =>
        prev.map((el) =>
          el.id === initiative.id
            ? {
                ...el,
                InitiativeVotes: [...el.InitiativeVotes, data.newVote],
              }
            : el
        )
      );
      setVoted((prev) => !prev);
    }
  };
  console.log(initiatives);

  const UnVote = async () => {
    await axiosRequest.delete(`/vote/${user.id}/${initiative.id}`);
    setInitiatives((prev) =>
      prev.map((el) =>
        el.id === initiative.id
          ? {
              ...el,
              InitiativeVotes: el.InitiativeVotes.filter(
                (arr) => arr.user_id !== user.id
              ),
            }
          : el
      )
    );
    setVoted((prev) => !prev);
  };

  return (
    // <div>
    //   {/* {loading && <h3>Загрузка...</h3>}
    //   {initiative && <div>{initiative.title}</div>} */}
    // </div>
    <div className="initiative-card">
      <div className="initiative-card-header">
        <h2>
          <Link
            to={`/initiatives/${initiative.id}`}
            className="initiative-card-title"
          >
            {initiative.title}
          </Link>
        </h2>
      </div>
      <div className="initiative-card-content">
        <p>{initiative.content}</p>
        <p>{initiative.level}</p>
      </div>
      <div className="initiative-card-footer">
        <div className="initiative-votes-count">
          {initiative.InitiativeVotes.length}
        </div>
        {user ? (
          voted ? (
            <button className="vote-button" onClick={UnVote}>
              ❤️
            </button>
          ) : (
            <button className="vote-button" onClick={voteInitiative}>
              🤍
            </button>
          )
        ) : (
          <div>❤️</div>
        )}
      </div>
    </div>
  );
}

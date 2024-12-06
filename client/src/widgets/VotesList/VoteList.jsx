import InitiativeApi from "../../entities/initiative/InitiativeApi";
import { useEffect, useState } from "react";
import { List, Card, message as antMessage, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function VoteList() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVotes() {
    try {
      const response = await InitiativeApi.getAllVotes();
      setVotes(response.data);
    } catch (error) {
      antMessage.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVotes();
  }, []);

  if (loading) {
    return <p>Uploading initiatives...</p>;
  }

  async function deleteVoteHandler(id) {
    try {
      await InitiativeApi.deleteFromVote(id);
      setVotes((prev) => [...prev].filter((el) => el.initiative_id !== id));
      antMessage.success("The initiative has been deleted");
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Votes 💜 </h1>
      {votes.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={votes}
          renderItem={(initiative) => (
            <List.Item>
              <Card
                title={initiative.title}
                cover={
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <div style={{ marginTop: "10px" }}>
                  <Popconfirm
                    title="Вы уверены?"
                    onConfirm={() => deleteVoteHandler(initiative.initiative_Id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      type="primary"
                      style={{
                        background: "#6a9aff",
                        border: "none",
                        color: "ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <div>
          <p> </p>
          <img
            src="https://www.meme-arsenal.com/memes/a6719f86288b339b56b7a3661961b84c.jpg"
            alt="no votes"
            style={{ width: "100%", maxWidth: "900px", marginTop: "30px" }}
          />
        </div>
      )}
    </div>
  );
}

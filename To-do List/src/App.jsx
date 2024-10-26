import { useState } from "react";
import Button from "react-bootstrap/Button";
import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";
import { Container, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Modal } from "react-bootstrap";

import "./App.css";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setedit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  

  const handleChange = (e) => {
    setinputValue(e.target.value);
  };
  const takeValue = (e) => {
    if (inputValue === "") {
      alert("Please Enter the Task");
    }
    if (inputValue.trim() !== "") {
      setTodo((prev) => [...prev, inputValue]);
      setinputValue("");
    }

    e.preventDefault();
  };
  const handleDelete = (index) => {
    const updatedTodo = todo.filter((Element, i) => i !== index);
    setTodo(updatedTodo);
  };

  const handleEdit = (index) => {
    setinputValue(todo[index]);
    setedit(index);
    console.log(index);
    console.log(todo);
    console.log(todo[index]);
  };

  // Handle saving the edited todo
  const handleSave = () => {
    const updatedTodos = todo.map((todo, i) =>
      i === edit ? inputValue : todo
    );
    setTodo(updatedTodos);
    setinputValue("");
    setedit(null);
  };
  const handleShowModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const mytodo = (toDo, index) => {
    return (
      <ListGroup.Item
        className="list-items"
        style={{
          display: "flex",
          fontFamily: "Varela Round",
          fontWeight: "bold",
          fontStyle: "normal",
          lineHeight: "50px",
          height: "70px",

          background: "white",
          borderRadius: "15px",
        }}
        key={index}
        onClick={()=> handleShowModal(toDo)}
      >
        <p className="todo-text">{toDo}</p>
        <span
          className="icon-img"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={deleteImg}
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(index)}}
          ></img>
          <img
            src={editImg}
            className="edit-btn"
            onClick={(e) =>{e.stopPropagation();
              handleEdit(index)} }
          ></img>
        </span>
      </ListGroup.Item>
    );
  };
  console.log();
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={8}>
          <Card
            className="todoCard"
            style={{
              height: "100%",
              background:
                "linear-gradient(135deg, #FFF7D1, #FFECC8 , #FFD09B , #FFB0B0)",
              borderRadius: "20px",
            }}
          >
            <form
              onSubmit={takeValue}
              style={{
                padding: "100px 30px",
                cursor: "pointer",
              }}
            >
              <h1
                className="title"
                style={{ fontFamily: "Varela Round", fontWeight: "600" }}
              >
                To-Do List
              </h1>
              <Row>
                <Col xs={12} md={6} lg={7} sm={12}>
                  <input
                    style={{
                      fontFamily: "Varela Round",
                      fontWeight: "bold",
                      textAlign: "center",
                      height: "50px",

                      
                    }}
                    type="text"
                    className="input"
                    placeholder="What's the task today :)"
                    value={inputValue}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={6} lg={5} sm={12}>
                  <button
                    className="taskbtn mt-2 mt-md-0"
                    onClick={edit !== null ? handleSave : takeValue}
                  >
                    {edit !== null ? "Save" : "Add Task"}
                  </button>
                </Col>
              </Row>

              {/* <Button className="taskbtn" variant="primary" type="submit">
          Add Task
        </Button> */}

              <div
                className="li-Div"
                style={{
                  height: "250px",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}
              >
                <ListGroup className="Ul-Listitem">
                  {" "}
                  {todo.map(mytodo)}
                </ListGroup>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Extended To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTodo}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;

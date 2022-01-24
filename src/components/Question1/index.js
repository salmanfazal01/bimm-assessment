import React, { useEffect, useRef, useState } from "react";
import { StyledTodoList } from "./TodoList.styled";
import { StyledTodoListItem } from "./TodoListItem.styled";
import { StyledDeleteButton } from "./DeleteButton.styled";
import { StyledTitleContainer } from "./TitleContainer.styled";
import { StyledTitle } from "./Title.styled";

const TodoItem = ({ onItemCompleted, onDeleteItem, id, completed, text }) => {
  const _listItem = useRef(null);

  const markCompleted = (event) => {
    onItemCompleted(id);
  };

  const deleteItem = (event) => {
    onDeleteItem(id);
  };

  useEffect(() => {
    if (_listItem) {
      // 1. Add highlight class.
      _listItem.current.classList.add("highlight");

      // 2. Set timeout.
      setTimeout(
        (listItem) => {
          // 3. Remove highlight class.
          listItem.current.classList.remove("highlight");
        },
        500,
        _listItem
      );
    }
  }, [_listItem]);

  var itemClass = "form-check todoitem " + (completed ? "done" : "undone");

  return (
    <StyledTodoListItem className={itemClass} ref={_listItem}>
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={markCompleted}
        />{" "}
        {text}
      </label>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={deleteItem}
      >
        x
      </button>
    </StyledTodoListItem>
  );
};

const TodoList = ({ items, onItemCompleted, onDeleteItem }) => {
  return (
    <StyledTodoList>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.done}
          onItemCompleted={onItemCompleted}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </StyledTodoList>
  );
};

const TodoApp = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const isChecked = items.some((item) => item.done);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: text,
      done: false,
    };

    setItems((old) => [...old, newItem]);
    setText("");
  };

  const markItemCompleted = (itemId) => {
    var updatedItems = items.map((item) => {
      if (itemId === item.id) item.done = !item.done;

      return item;
    });

    // [].concat(updatedItems)
    setItems(updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    var updatedItems = items.filter((item) => {
      return item.id !== itemId;
    });

    // [].concat(updatedItems)
    setItems(updatedItems);
  };

  const handleDeleteMultipleItems = () => {
    var updatedItems = items.filter((item) => !item.done);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <StyledTitleContainer>
        <StyledTitle>TO DO LIST</StyledTitle>

        {isChecked && (
          <StyledDeleteButton onClick={handleDeleteMultipleItems}>
            Delete Selected
          </StyledDeleteButton>
        )}
      </StyledTitleContainer>

      <div className="row">
        <div className="col-md-3">
          <TodoList
            items={items}
            onItemCompleted={markItemCompleted}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </div>
      <form className="row">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            onChange={handleTextChange}
            value={text}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={handleAddItem}
            disabled={!text}
          >
            {"Add #" + (items.length + 1)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoApp;

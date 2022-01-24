import styled from "styled-components";

export const StyledTodoListItem = styled.li`
  position: relative;
  margin-bottom: 0.25rem;
  padding: 0.5rem 0.3rem;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;

  &.done .form-check-label {
    color: #999;
    text-decoration: line-through;
  }
  &.highlight {
    border-color: #ff2968;
    background-color: #ff8fb0;
  }
  &.highlight:last-child {
    border-color: #ff2968;
  }
  &:last-child {
    border-bottom: 1px solid #ccc;
  }
  .form-check-label {
    width: 100%;
  }
  .form-check-input {
    margin-right: 1rem;
  }
`;

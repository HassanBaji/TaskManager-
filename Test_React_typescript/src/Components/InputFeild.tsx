import React, { useRef } from "react";
import "./styles.css";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handelAdd: (ev: React.FormEvent) => void;
}

export const InputFeild: React.FC<Props> = ({ todo, setTodo, handelAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(ev) => {
        handelAdd(ev);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

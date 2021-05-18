import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList(props: Task) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const newTask = {
      id: Math.floor(Math.random() * 1001),
      title: newTaskTitle,
      isComplete: false,
    };

    if (newTask.title === "") {
      alert("Por favor, insira um todo valido");
    } else {
      setTasks((oldTask) => [...oldTask, newTask]);
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskCompleted = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(taskCompleted);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const identifierTask = tasks.filter((task) => task.id !== id);
    setTasks(identifierTask);
    console.log(id);
  }

  function removeAllTasks() {
    setTasks([]);
  }

  function removeCompletedTasks() {
    const fiterCompletedTasks = tasks.filter(
      (task) => task.isComplete === false
    );
    setTasks(fiterCompletedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            id="insertionField"
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <div className="remove-tasks">
          <div>
            <button
              type="button"
              data-testid="removeAll-task-button"
              onClick={() => removeAllTasks()}
            >
              <FiTrash size={16} />
            </button>
            <span>Apagar todos as Tarefas</span>
          </div>

          <div>
            <button
              type="button"
              data-testid="removeCompleted-task-button"
              onClick={() => removeCompletedTasks()}
            >
              <FiTrash size={16} />
            </button>
            <span>Apagar tarefas completas</span>
          </div>
        </div>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>
              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

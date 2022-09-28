import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../../services/api";
import { useUser } from "../UserProvider";

interface Children {
  children: ReactNode;
}

interface TaskCreateData {
  description: string;
}

interface TaskUpdateData {
  TaskId: string;
  description: string;
}

interface TaskData {
  id: string;
  description: string;
  is_complete: boolean;
}

interface TaskProviderData {
  allTasks: TaskData[];
  getTasks: () => void;
  createTask: (credentials: TaskCreateData) => Promise<void>;
  updateTask: (credentials: TaskUpdateData) => Promise<void>;
  completeTask: (credentials: string) => Promise<void>;
  deleteTask: (credentials: string) => Promise<void>;
}

const EventContext = createContext<TaskProviderData>({} as TaskProviderData);

const useTask = () => useContext(EventContext);

const TaskProvider = ({ children }: Children) => {
  const { token } = useUser();

  const [allTasks, setAllTasks] = useState<TaskData[]>([]);

  const getTasks = async () => {
    const response = await api.get("/api/tasks", {
      headers: { Authorization: `token ${token}` },
    });
    const data = response.data;
    setAllTasks(data);
  };

  const createTask = async ({ description }: TaskCreateData) => {
    await api.post(
      "/api/tasks",
      { description },
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    const response = await api.get("/api/tasks", {
      headers: { Authorization: `token ${token}` },
    });
    const data = response.data;
    setAllTasks(data);
  };

  const updateTask = async ({ description, TaskId }: TaskUpdateData) => {
    await api.patch(
      `/api/tasks/${TaskId}`,
      { description },
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    const response = await api.get("/api/tasks", {
      headers: { Authorization: `token ${token}` },
    });
    const data = response.data;
    setAllTasks(data);
  };

  const completeTask = async (TaskId: string) => {
    await api.patch(
      `/api/tasks/${TaskId}/complete`,
      { content: "nothing" },
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    const response = await api.get("/api/tasks", {
      headers: { Authorization: `token ${token}` },
    });
    const data = response.data;
    setAllTasks(data);
  };

  const deleteTask = async (TaskId: string) => {
    await api.delete(`/api/tasks/${TaskId}`, {
      headers: { Authorization: `token ${token}` },
    });

    const response = await api.get("/api/tasks", {
      headers: { Authorization: `token ${token}` },
    });
    const data = response.data;
    setAllTasks(data);
  };

  return (
    <EventContext.Provider
      value={{
        completeTask,
        updateTask,
        deleteTask,
        createTask,
        getTasks,
        allTasks,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { useTask, TaskProvider };

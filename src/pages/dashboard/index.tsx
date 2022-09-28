import { useDisclosure } from "@chakra-ui/react";

import { useTask } from "../../providers/TaskProvider";
import { useUser } from "../../providers/UserProvider";
import { useEffect, useState } from "react";
import { ModalTaskUpdate } from "../../components/Modal/ModalTaskUpdate";

import { TaskList } from "./TaskList";
import { FirstTask } from "./FirstTask";
import { useHistory } from "react-router-dom";

interface Task {
  id: string;
  description: string;
  is_complete: boolean;
}

export const Dashboard = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { allTasks, getTasks } = useTask();
  const { token } = useUser();

  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  useEffect(() => {
    getTasks().then((res) => setLoading(false));
  });

  useEffect(() => {
    if (!token) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const {
    isOpen: isTaskDetailOpen,
    onOpen: onTaskDetailOpen,
    onClose: onTaskDetailClose,
  } = useDisclosure();

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  return (
    <>
      <ModalTaskUpdate
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      {!loading && !allTasks.length ? (
        <FirstTask />
      ) : (
        <TaskList
          handleClick={handleClick}
          loading={loading}
          tasks={allTasks}
        />
      )}
    </>
  );
};

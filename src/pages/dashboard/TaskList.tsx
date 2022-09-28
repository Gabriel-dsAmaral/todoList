import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { CreateButton } from "../../components/Form/CreateButton";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";

interface Task {
  id: string;
  description: string;
  is_complete: boolean;
}

interface TaskListProps {
  loading: boolean;
  tasks: Task[];
  handleClick: (task: Task) => void;
}

export const TaskList = ({ loading, tasks, handleClick }: TaskListProps) => (
  <Box>
    <Header />
    <CreateButton />
    <Grid
      w="100%"
      templateColumns={"repeat(auto-fill,minmax(420px,1fr))"}
      gap={10}
      paddingX={"8"}
      mt="8"
    >
      {loading ? (
        <CardSkeleton repeatCount={12} />
      ) : (
        tasks.map((task) => (
          <Card key={task.id} task={task} onClick={handleClick} />
        ))
      )}
    </Grid>
  </Box>
);

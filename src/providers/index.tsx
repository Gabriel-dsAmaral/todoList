import { ReactNode } from "react";
import { UserProvider } from "./UserProvider";
import { TaskProvider } from "./TaskProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserProvider>
      <TaskProvider>{children}</TaskProvider>
    </UserProvider>
  );
};

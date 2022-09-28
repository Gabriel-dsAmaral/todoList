import { createContext, useContext, useState, ReactNode } from "react";
import jwt_decode from "jwt-decode";
import { api } from "../../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface TaskData {
  id: string;
  description: string;
  is_complete: boolean;
}

interface User {
  id: string;
  user_name: string;
  email: string;
  tasks: TaskData[];
}

interface SighInCredentials {
  email: string;
  password: string;
}

interface SigNupCredentials {
  user_name: string;
  email: string;
  password: string;
}

interface EditUserCredentials {
  user_name?: string;
  email?: string;
}

interface UserContextData {
  user: User;
  token: string;
  signOut: () => void;
  signIn: (credentials: SighInCredentials) => Promise<void>;
  sigNup: (credentials: SigNupCredentials) => Promise<void>;
  EditUser: (credentials: EditUserCredentials) => Promise<void>;
  getMyUser: () => void;
}

interface UserState {
  token: any;
  user: User;
  userId: any;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserProviderProps) => {
  const [data, setData] = useState<UserState>(() => {
    const token = localStorage.getItem("@doit:acessToken");
    const user = localStorage.getItem("@doit:user");
    const userId = localStorage.getItem("@doit:userId");

    if (token && user && userId) {
      return { token, user: JSON.parse(user), userId };
    }
    return {} as UserState;
  });

  const signIn = async ({ email, password }: SighInCredentials) => {
    const responseToken = await api.post("/api/signin", { email, password });

    const { token } = responseToken.data;
    const decoded = jwt_decode<any>(token);

    const responseUser = await api.get("api/users", {
      headers: { Authorization: `token ${token}` },
    });

    const user = responseUser.data;
    const userId = decoded.id;

    localStorage.setItem("@doit:user", JSON.stringify(user));
    localStorage.setItem("@doit:acessToken", token);
    localStorage.setItem("@doit:userId", userId);
    setData({ token, user, userId });
  };

  const signOut = () => {
    localStorage.clear();

    setData({} as UserState);
  };

  const sigNup = async ({ user_name, email, password }: SigNupCredentials) => {
    await api.post("/api/signup", {
      user_name,
      email,
      password,
    });
  };

  const EditUser = async ({ user_name, email }: EditUserCredentials) => {
    const response = await api.patch(
      `/api/users/${localStorage.getItem("@doit:userId")}`,
      { user_name, email },
      {
        headers: { Authorization: `token ${data.token}` },
      }
    );
    const token = localStorage.getItem("@doit:acessToken");
    const userId = localStorage.getItem("@doit:userId");
    const user = response.data;
    localStorage.setItem("@doit:user", JSON.stringify(user));
    setData({ token, user, userId });
  };

  const getMyUser = async () => {
    const response = await api.get("/api/users", {
      headers: {
        Authorization: `token ${localStorage.getItem("@doit:acessToken")}`,
      },
    });

    const decoded = jwt_decode<any>(data.token);
    const userId = decoded.id;
    const user = response.data;
    const token = data.token;

    localStorage.setItem("@doit:user", JSON.stringify(user));
    localStorage.setItem("@doit:acessToken", token);
    localStorage.setItem("@doit:userId", userId);
    setData({ token, user, userId });
  };

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        sigNup,
        EditUser,
        getMyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };

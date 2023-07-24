import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { Project } from "./model";

interface StateContextProps {
  user: { username: string; _id: string; email: string } | null;
  token: string | null;
  notification: string | null;
  projectsIds: [{ projectId: string }] | null;
  setUser: (
    user: { username: string; _id: string; email: string } | null
  ) => void;
  setToken: (token: string | null) => void;
  setNotification: (message: string | null) => void;
  setProjectsIds: (projectsIds: [{ projectId: string }] | null) => void;
}

const StateContext = createContext<StateContextProps>({
  user: null,
  token: null,
  notification: null,
  projectsIds: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setProjectsIds: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    username: string;
    _id: string;
    email: string;
  } | null>(null);
  const [notification, _setNotification] = useState<string | null>("");
  const [token, _setToken] = useState<string | null>(
    Cookies.get("AUTH-TOKEN") || null
  );
  const [projectsIds, setProjectsIds] = useState<
    [{ projectId: string }] | null
  >(null);

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      Cookies.set("AUTH-TOKEN", token, { expires: 7 }); // Store the token in cookies for 7 days
    } else {
      Cookies.remove("AUTH-TOKEN");
    }
  };

  const setNotification = (message: string | null) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  useEffect(() => {
    const storedToken = Cookies.get("AUTH-TOKEN");
    if (storedToken) {
      _setToken(storedToken);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        notification,
        token,
        projectsIds,
        setUser,
        setToken,
        setNotification,
        setProjectsIds,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps =>
  useContext(StateContext);

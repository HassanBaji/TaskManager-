import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface StateContextProps {
  user: string | null;
  token: string | null;
  notification: string | null;
  setUser: (user: string | null) => void;
  setToken: (token: string | null) => void;
  setNotification: (message: string | null) => void;
}

const StateContext = createContext<StateContextProps>({
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [notification, _setNotification] = useState<string | null>("");
  const [token, _setToken] = useState<string | null>(
    Cookies.get("AUTH-TOKEN") || null
  );

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
        setUser,
        setToken,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps =>
  useContext(StateContext);

import {createContext, PropsWithChildren, useEffect, useRef, useState} from "react";

export type Tokens = {
    accessToken: string
    refreshToken: string
}

export type Auth = {
    username: string;
    roles: string[];
    tokens: Tokens;
};

export type AuthContextType = {
    auth: Auth | null;
    logout(): void;
    setAuth(auth: Auth | null): void;
    contextLoaded: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider( { children } : PropsWithChildren) {
    const [state, setState] = useState<Auth | null>(null);
    const [componentDidMount, setComponentDidMount] = useState(false);

    const logout = () => {
        localStorage.removeItem('auth');
        setState(null);
    }

    useEffect(() => {
        if(state) localStorage.setItem('auth', JSON.stringify(state))
    }, [state]);

    useEffect(() => {
      if(!componentDidMount) {
          const authStr = localStorage.getItem('auth');

          if(authStr) {
              const auth: Auth = JSON.parse(authStr);
              setState(auth);
          }
          setComponentDidMount(true);
      }
    }, []);

    return (
        <AuthContext.Provider value={{auth: state, setAuth: setState, logout, contextLoaded: componentDidMount }}>
            {children}
        </AuthContext.Provider>
    )
}
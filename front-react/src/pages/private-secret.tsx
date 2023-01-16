import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContextType, AuthContext, Auth } from "../contexts/AuthContext";

export default function PrivateSecret() {

  const { auth, logout, setAuth, contextLoaded } = useContext(AuthContext) as AuthContextType;
  const [ secret, setSecret ] = useState<string | null>(null);
  const isInitialMount = useRef(true);
  const shouldRetry = useRef(true);

  //Try to refresh token, if fails, redirect to login
  const refreshToken = () => {
    if(!shouldRetry.current) {
      logout();
      location.href = location.origin + '/login';
      return;
    }

    const { accessToken } = auth!.tokens;
    const { refreshToken } = auth!.tokens;

    axios.post<Auth>('http://localhost:3001/api/auth/refresh', {
      accessToken, refreshToken
    }).then((response) => {
      setAuth(response.data);
      console.log('Token refreshed!');
      shouldRetry.current = false;
    }).catch(() => {
      logout();
      location.href = location.origin + '/login';
    });
  }

  //Try get secret, if fails, try to refresh token
  const getData = () => {
    if(!auth) {
      location.href = location.origin + '/login';
      return;
    }

    axios.get('http://localhost:3001/api/secrets/private', {
      headers: {
        "Authorization": `Bearer ${auth!.tokens.accessToken}`
      }
    }).then((response) => {
      setSecret(response.data);
    }).catch(() => {
      refreshToken();
    });
  }

  useEffect(() => {
    if (contextLoaded && (isInitialMount.current || shouldRetry)) {
      //console.log(auth);
      //console.log(contextLoaded);
      getData();
      isInitialMount.current = false;
    }
  }, [auth]);

  return (
    <>
      <div className="flex justify-center my-20">
        <div className="bg-slate-300 p-24 shadow-md">
          El secreto es... <br/>
          <b>{secret}</b>
        </div>
      </div>
    </>
  )
}
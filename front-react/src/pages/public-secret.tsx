import axios from "axios";
import { useEffect, useState } from "react"

export default function PublicSecret() {
  const [secret, setSecret] = useState<string | null>(null);

  const getData = async() => {
    try {
      const response = await axios.get('http://localhost:3001/api/secrets/public');
      setSecret(response.data);
    } catch {
      setSecret('Error trying to get the public secret!');
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
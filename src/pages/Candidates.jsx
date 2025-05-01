import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Candidates() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      if (!user) {
        navigate("/");
      }
    }, [user, navigate]);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
      </div>
    );
}
  
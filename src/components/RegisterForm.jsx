import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    age: "",
  });
  const navigate = useNavigate();

  const checkEmail = async () => {
    // const res = await fetch(`/api/users/check-email?email=${email}`);
    // const data = await res.json();
    // setEmailExists(data.exists);
    setEmailChecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch("/api/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, ...userData }),
    // });
    // const newUser = await res.json();
    // localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/candidates");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-semibold mb-4">Registro</h2>

      {!emailChecked ? (
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            type="email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={checkEmail}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Verificar Email
          </button>
        </div>
      ) : emailExists ? (
        <p className="text-red-600">Este email ya está registrado.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            Nombre:
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </label>
          <label>
            Edad:
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={userData.age}
              onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            />
          </label>
          <label>
            Personalidad:
            <select
                className="border p-2 rounded w-full"
                value={userData.personality}
                onChange={(e) => setUserData({ ...userData, personality: e.target.value })}>
                <option value="">Seleccione una personalidad</option>
                <option value="INTJ">INTJ</option>
                <option value="INTP">INTP</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
                <option value="INFJ">INFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENFP">ENFP</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
            </select>
        </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Registar perfil
          </button>
        </form>
      )}
    </div>
  );
}

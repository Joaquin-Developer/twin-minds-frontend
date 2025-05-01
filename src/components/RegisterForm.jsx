import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../services/apiService";


export default function RegisterForm() {
  const [step, setStep] = useState("checkEmail");
  const [email, setEmail] = useState("");

  const [allInterests, setInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterests, setFilteredInterests] = useState([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      const cached = sessionStorage.getItem("metadata");
      if (!cached) {
        const data = await APIService.getMetadata();
        sessionStorage.setItem("metadata", JSON.stringify(data));
      }

      const interestsData = JSON.parse(sessionStorage.getItem("metadata"));
      setInterests(interestsData.interests);
    }
    fetchMetadata();
  }, [])

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    personality: "",
    interests: []
  });
  const navigate = useNavigate();

  const checkEmail = async () => {
    if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
      alert("Email invalido");
      setEmail("");
      return;
    }
    const exists = await APIService.mailExists(email);

    if (exists) {
      navigate("/candidates");
    } else {
      setStep("createUser");
    }
  };

  useEffect(() => {
    const filtered = allInterests.filter((i) =>
      i.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterests(filtered.slice(0, 10));
  }, [searchTerm, allInterests]);

  const toggleInterest = (interest) => {
    if (userData.interests.includes(interest)) {
      setUserData({
        ...userData,
        interests: userData.interests.filter((i) => i !== interest)
      });
    } else {
      setUserData({
        ...userData,
        interests: [...userData.interests, interest]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      ...userData
    };
    const newUser = await APIService.createNewUser(payload);

    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/candidates");    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-semibold mb-4">
        {step === "checkEmail" ? "Validación de perfil" : "Crear perfil"}
      </h2>

     {step === "checkEmail" && (
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            type="email"
            className="border p-2 rounded"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={checkEmail}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Verificar Email
          </button>
        </div>
      )} 
      {step === "createUser" && (
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
              onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
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
          <label>
            Intereses:
            <input
              type="text"
              placeholder="Buscar..."
              className="border p-2 rounded w-full mt-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {filteredInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className={`px-3 py-1 rounded-full border ${
                    userData.interests.includes(interest)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            {userData.interests.length > 0 && (
              <div className="mt-2">
                <strong>Seleccionados:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
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

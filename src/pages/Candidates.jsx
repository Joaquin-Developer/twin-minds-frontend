import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../services/apiService";


export default function Candidates() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [candidatesData, setCandidatesData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        if (!user) {
          navigate("/");
          return;
        }
        const data = await APIService.getCandidatesData(user.id);
        setCandidatesData(data);
      }
      fetchData();

    }, []);

    const handleLike = () => {
      // TODO send like
      setCurrentIndex((prev) => prev + 1);
    };

    const handlePass = () => {
      // TODO implement this handler
      setCurrentIndex((prev) => prev + 1);
    };

    const handleDislike = () => {
      // TODO send dislike
      setCurrentIndex((prev) => prev + 1);
    };

    if (!candidatesData.length || currentIndex >= candidatesData.length) {
      return (
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
          <p className="mt-4 text-lg">No hay más candidatos por ahora :)</p>
        </div>
      );
    }
  
    const candidate = candidatesData[currentIndex];

    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Twin Minds con {user?.name}</h1>
  
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden">
          <img
            src="https://cdn.dribbble.com/userupload/21906345/file/original-01df5921dd2bc745b56cc6e46326ee08.png?resize=752x564&vertical=center"
            alt="Foto de perfil"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">
              {candidate.name}, {candidate.age}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Personalidad:</strong> {candidate.personality}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Intereses:</strong>{" "}
              {candidate.interests && candidate.interests.join(", ")}
            </p>
          </div>
          <div className="flex justify-around items-center gap-4 p-4">
            <button
              onClick={handleDislike}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              ❌ Dislike
            </button>
            <button
              onClick={handlePass}
              className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500"
            >
              Pass
            </button>
            <button
              onClick={handleLike}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            >
              ❤️ Like
            </button>
          </div>
        </div>
      </div>
    );
}

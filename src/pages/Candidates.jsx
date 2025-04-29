export default function Candidates() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
      </div>
    );
  }
  
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../nav/nav";
import Side from "../side/Side";

export default function Dashboard() {

    const params = useParams();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/api/usuarios/${params.id}`)
          .then((response) => {
            setUsuario(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      if (!usuario) {
        return <div className="mt-28 text-xl text-center">Loading...</div>;
      }

  return (
    <>
    <main className="w-full h-screen flex justify-start">
    <Side id={params.id}></Side>
      <div className="w-10/12 h-screen bg-[#f5f6fa]">
        <h1 className="text-[28px] font-semibold p-[10px]">Dashboard</h1>
        <div className="w-1/2 h-[100px] bg-white m-[10px]">
          <p className="text-[#797778] p-[5 px]">Bienvenido {usuario.usuario}</p>
          <p className="text-[#797778] p-[5 px]">
            Selecciona la accion que deseas realizar en las pestañas del menú de
            la izquierda.
          </p>
        </div>
      </div>
    </main>
        
    </>
  );
}

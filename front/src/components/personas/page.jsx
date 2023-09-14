import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Side from "../side/Side";

export default function Personas() {
  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/personas/")
      .then((response) => {
        setPersonas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get(`http://127.0.0.1:8000/api/usuarios/${params.id}`)
      .then((response) => {
        setUsuario(response.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  return (
    <>
      {cargando ? (
        <div className="mt-28 text-xl text-center">Loading...</div>
      ) : (
        <div className="w-full h-screen flex justify-start">
          <Side id={params.id}></Side>
          <div className="w-10/12 h-screen bg-[#f5f6fa] parte-blanca-login">
            <h1 className="text-[28px] font-semibold p-[10px]">
              Lista de Personas
            </h1>
            <div className="w-11/12 h-auto bg-white m-[10px]">
              <div className="w-full h-[50px] flex flex-row justify-evenly items-center p-[10px] border-solid border-gray-400">
                <div className="w-1/2 flex justify-start items center">
                  <p>Informacion de Personas</p>
                </div>
                <div className="w-1/2 flex justify-end items center">
                  <button className="w-auto h-[40px] bg-[#007aff] rounded-lg text-[white] p-[5px]">
                    Agregar Persona
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ">
                        Primer nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Segundo nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Primer Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Segundo Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Fecha Creacion
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Ultima Fecha Mod.
                      </th>
                      
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {personas.map((p, index) => (
                      <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{p.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.primer_nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.segundo_nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.primer_apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.segundo_apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.created_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{p.updated_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap">opciones</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
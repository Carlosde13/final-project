import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Side from "../side/Side";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/roles/")
      .then((response) => {
        setRoles(response.data);
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

  // if(usuario){
  //   if(usuario.rol_id != 1){
  //     window.location.href = `../dashboard/${params.id}`
  //   }
  // }
  return (
    <>
      {cargando ? (
        <div className="mt-28 text-xl text-center">Loading...</div>
      ) : (
        <div className="w-full h-screen flex justify-start">
          <Side id={params.id}></Side>
          <div className="w-10/12 h-screen bg-[#f5f6fa] parte-blanca-login">
            <h1 className="text-[28px] font-semibold p-[10px]">
              Lista de Roles
            </h1>
            <div className="w-11/12 h-auto bg-white m-[10px]">
              <div className="w-full h-[50px] flex flex-row justify-evenly items-center p-[10px] border-solid border-gray-400">
                <div className="w-1/2 flex justify-start items center">
                  <p>Informacion de Roles</p>
                </div>
                <div className="w-1/2 flex justify-end items center">
                  <button className="w-auto h-[40px] bg-[#007aff] rounded-lg text-[white] p-[5px]">
                    Agregar Rol
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
                        Nombre del Rol
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
                    {roles.map((r, index) => (
                      <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{r.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{r.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{r.created_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{r.updated_at}</td>
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
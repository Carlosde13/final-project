import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Side({id}) {
  const params = useParams();

    const [usuario, setUsuario] = useState({});
    const [cargando, setCargando] = useState(true);
  
    useEffect(() => {
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

    if (!usuario) {
      return <div className="mt-28 text-xl text-center">Loading...</div>;
    }
  const usuariosLink = `../usuarios/${usuario.id}`;
  const perfilLink = `../perfil/${usuario.id}`;
  const personasLink = `../personas/${usuario.id}`;
  const rolesLink = `../roles/${usuario.id}`
  return (
    <>
      {cargando ? (
        <div className="mt-28 text-xl text-center">Loading...</div>
      ):(
        <div className="w-1/6 h-screen ">
        <section className="w-1/6 h-screen bg-[#353a40] flex flex-col fixed">
          <div className="h-auto border-b border-[#b5babd] flex flex-row justify-start items-center  p-[15px] gap-[8px]">
            <div className="rounded-full overflow-hidden w-[45px] h-[45px]">
              <img src="../icons/dash.png" />
            </div>
            <p className="text-[#98a0ab] font-semibold">BIENVENIDO</p>
          </div>
          <div className="h-auto border-b border-[#b5babd] flex flex-col justify-center items-start  p-[15px] gap-[8px]">
            <a className="text-[#98a0ab] text-[14px] font-semibold hover:cursor-pointer" href={perfilLink}>{usuario.usuario}</a>
            <p className="text-[#98a0ab] text-[14px] font-normal">{usuario.rol.nombre}</p>
          </div>
          <div className="h-auto flex flex-col justify-center items-center p-[8px] ">
            <p className="text-[#98a0ab] text-[12px] font-semibold"></p>
          </div>
          <div className="h-auto flex flex-col justify-center items-start p-[8px] gap-[10px]">
            {usuario.rol_id == 1 ? (
              <a
              href={rolesLink}
              className="flex flex-row justify-center items-center gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#98a0ab]">
                joystick
              </span>
              <p className="text-[#98a0ab] text-[12px] font-semibold">
                Roles
              </p>
            </a>
            ):(
              <></>
            )
            }

            {usuario.rol_id == 1 ? (
            <a
              href={usuariosLink}
              className="flex flex-row justify-center items-center gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#98a0ab]">
                group
              </span>
              <p className="text-[#98a0ab] text-[12px] font-semibold">
                Usuarios
              </p>
            </a>):(<></>)}

            {usuario.rol_id == 1 ? (
              <a
              href={personasLink}
              className="flex flex-row justify-center items-center gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#98a0ab]">
                person
              </span>
              <p className="text-[#98a0ab] text-[12px] font-semibold">
                Personas
              </p>
            </a>
            ):(
              <></>
            )}
          </div>
          <div className="h-auto flex flex-col justify-center items-start p-[8px]">
            <a
              href="#"
              className="flex flex-row justify-center items-center gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#98a0ab]">
                description
              </span>
              <p className="text-[#98a0ab] text-[12px] font-semibold">
                Mis Paginas
              </p>
            </a>

            
          </div>
        </section>
      </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Nav({ id }) {
  const [mostrando, setMostrando] = useState(false);

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
  function cambiarMostrando() {
    const nuevoValor = !mostrando;
    setMostrando(nuevoValor);
  }

  if (!usuario) {
    return <></>;
  }
  const profileLink = `../perfil/${usuario.id}`
  const dashboardLink = `../dashboard/${usuario.id}`
  return (
    <nav className="fixed top-0 w-full bg-white  flex items-center justify-center">
      <div className="w-11/12 pb-[10px]  pt-[10px] flex justify-between items-center">
        <img src="../icons/devchallenges.svg" alt="Page Logo" />
        <div className="flex items-center justify-center gap-[10px]">
          <div
            className="w-auto flex items-center justify-between hover:cursor-pointer"
            onClick={cambiarMostrando}
          >
            <p className="font-[Noto Sans] text-[12px] font-bold">
              {usuario.usuario}
            </p>
            {mostrando ? (
              <div
                className="flex items-center justify-center arriba"
                id="flecha-div"
                onClick={cambiarMostrando}
              >
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                id="flecha-div"
                onClick={cambiarMostrando}
              >
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {mostrando ? (
        <div
          className="w-48 h-44 rounded-lg border border-gray-300 bg-white shadow-md fixed top-[5%] right-[3%] flex justify-center items-center"
          id="menu-desplegable"
        >
          <div className="w-[85%] flex flex-col gap-[8px]">
            <div className="w-[90%]">
              <div className="w-full flex justify-start items-center gap-[8px] hover:bg-[#F2F2F2] hover:cursor-pointer rounded-lg h-[45px] p-[5px]">
                <div className="flex justify-center items-center">
                  <span className="material-symbols-outlined text-[#4F4F4F]">
                    person
                  </span>
                </div>
                <a className="text-[#4F4F4F] font-medium" href={profileLink}>
                  My Profile
                </a>
              </div>
            </div>
            <div className="w-[90%]">
              <div className="w-full flex justify-start items-center gap-[8px] hover:bg-[#F2F2F2] hover:cursor-pointer rounded-lg h-[45px] p-[5px]">
                <div className="flex justify-center items-center">
                  <span className="material-symbols-outlined text-[#4F4F4F] ">
                    dashboard
                  </span>
                </div>
                <a className="text-[#4F4F4F] font-medium" href={dashboardLink}>
                  Dashboard
                </a>
              </div>
            </div>
            <div className="flex w-full border-b border-gray-300" />
            <div className="w-[90%]">
              <div className="w-full flex justify-start items-center gap-[8px] hover:bg-[#F2F2F2] hover:cursor-pointer rounded-lg h-[45px] p-[5px]">
                <div className="flex justify-center items-center">
                  <span className="material-symbols-outlined text-[#EB5757]">
                    logout
                  </span>
                </div>
                <a className="text-[#EB5757] font-medium" href="../">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../nav/nav";

export default function Perfil() {
  const params = useParams();
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/usuarios/")
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const user = usuario.find((us) => us.id == params.id);
  if (!user) {
    return <div className="mt-28 text-xl text-center">Loading...</div>;
  }
  console.log(user);
  const editLink = "../editarperfil/"+user.id;
  return (
    <>
    
      <Nav id={params.id}></Nav>
      <div className="w-full h-screen flex flex-col items-center justify-around gap-[15px]">
        <div className="w-11/12 h-screen flex flex-col justify-around items-center">
          
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-[#000] font-[Noto Sans] text-2xl font-normal">
              Personal info
            </h2>
            <h3 className="text-[#000] font-[Noto Sans] font-light text-sm">
              Basic info, like your name and photo
            </h3>
          </div>
          <div className="w-1/2 h-auto pt-[10px] rounded-xl border border-solid border-gray-300 flex flex-col items-center">
            <div className="w-11/12 flex justify-between items-center pb-[8px]">
              <div className="w-3/5 flex flex-col items-start justify-center">
                <h2 className="text-[#000] text-2xl font-normal">Profile</h2>
                <h5 className="text-[#828282] text-[13px] font-normal">
                  Some info may be visible to other people
                </h5>
              </div>
              <div className="w-2/5 flex justify-end items-center">
                <button
                  //   onclick=""
                  className="text-center w-1/2 h-9 rounded-lg border border-gray-400 bg-transparent outline-none  transition duration-500"
                >
                  <a className="text-gray-400 font-noto-sans font-medium text-base" href={editLink}>Edit</a>
                </button>
              </div>
            </div>
            <div className="w-full border-b border-gray-300" />
            <div className="w-full border-b border-gray-300 h-auto flex justify-center items-center ">
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  FIRST NAME
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  {user.persona.primer_nombre +
                    " " +
                    user.persona.segundo_nombre}
                </b>
              </div>
            </div>
            <div className="w-full border-b border-gray-300 h-auto flex justify-center items-center ">
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  LASTNAME
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  {user.persona.primer_apellido +
                    " " +
                    user.persona.segundo_apellido}
                </b>
              </div>
            </div>
            <div className="w-full border-b border-gray-300 h-auto flex justify-center items-center ">
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  USERNAME
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  {user.usuario}
                </b>
              </div>
            </div>
            <div
              className="w-full border-b border-gray-300 h-auto flex justify-center items-center "
              id="tel-div"
            >
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  ROL
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  {user.rol.nombre}
                </b>
              </div>
            </div>
            <div className="w-full border-b border-gray-300 h-auto flex justify-center items-center ">
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  MEMBER SINCE
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  {user.created_at}
                </b>
              </div>
            </div>
            <div className="w-full h-auto flex justify-center items-center ">
              <div className="w-11/12 h-16 flex justify-between items-center pb-[5px]">
                <p className="w-2/5 text-[#BDBDBD] text-[13px] font-medium">
                  PASSWORD
                </p>
                <b className="text-[#333] text-[16px] font-medium">
                  **********
                </b>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-between items-end">
            <p className="text-[#BDBDBD] text-[10px] font-normal">
              Created by Carlos de León
            </p>
            <p className="text-[#BDBDBD] text-[10px] font-normal">
              devchallenges.io
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

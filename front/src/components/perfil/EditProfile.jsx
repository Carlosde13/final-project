import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../nav/nav";

export default function EditarPerfil() {
    const params = useParams();
    // Inicializa usuario como un objeto con propiedades usuario y contrasena
    const [usuario, setUsuario] = useState({
      usuario: "",
      contrasena: "",
    });
  
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
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setUsuario({
        ...usuario,
        [id]: value,
      });
    };
  
    if (!usuario) {
      return <div className="mt-28 text-xl text-center">Loading...</div>;
    }
    const returnLink = "../perfil/" + usuario.id;
    console.log(usuario)
    
    let accion = `http://127.0.0.1:8000/api/editarme/${usuario.id}`
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  gap-[15px]">
      <Nav id={params.id}></Nav>
      <div className="w-[90%] min-h-full flex flex-col justify-around items-center">
        <div className="w-full min-h-full flex items-center justify-center flex-col">
          <div className="w-[80%] flex justify-start items-center text-[#2D9CDB]">
            <span className="material-symbols-outlined text-[19px]">navigate_before</span>
            <a id="returnLink" href={returnLink} className="text-[17px] text-[#2D9CDB]">
              Back
            </a>
          </div>
          <div className="w-[35%] min-h-[50vh] pt-[10px] rounded-[12px] border border-solid border-gray-300 flex flex-col justify-evenly items-start gap-[20px] p-[50px]">
            <div className="w-[90%] flex flex-col justify-center items-start">
              <h2 className="text-[#000] font-[Noto Sans] text-[24px] font-normal">Change Info</h2>
              <h3 className="text-[#000] font-[Noto Sans] text-[14px] font-light">Changes will be reflected to every services</h3>
            </div>
            <form
              action={accion}
              method="POST"
              encType="multipart/form-data"
              className="w-full gap-[10px]"
            >
              <div className="w-full flex flex-col justify-between items-start p-[5px]">
                <label htmlFor="nombre" className="text-[#4F4F4F] font-[Noto Sans] text-[14px] font-medium">Username</label>
                <input
                  placeholder="Enter your name..."
                  id="nombre"
                  type="text"
                  defaultValue={usuario.usuario || ""}
                  name="usuario"
                  onChange={handleInputChange}
                  className="w-full h-[52px] rounded-[12px] border border-solid border-gray-700 font-[Noto Sans] text-[14px] font-medium p-[5px]"
                />
              </div>
              <div className="w-full flex flex-col justify-between items-start p-[5px]">
                <label htmlFor="pass" className="text-[#4F4F4F] font-[Noto Sans] text-[14px] font-medium">Password</label>
                <input
                  placeholder="Enter your name..."
                  id="pass"
                  type="password"
                  name="contrasena"
                  defaultValue={usuario.contrasena || ""}
                  onChange={handleInputChange}
                  className="w-full h-[52px] rounded-[12px] border border-solid border-gray-700 font-[Noto Sans] text-[14px] font-medium p-[5px]"
                />
                <input name="usuario_modificacion" className="hidden" value={usuario.id}></input>
              </div>
              <input type="submit" value="Save" className="text-[#828282] text-[13px] font-medium hover:cursor-pointer rounded-lg border border-gray-400 bg-transparent w-[50px] h-[30px] m-[10px]"/>
            </form>
          </div>
          <div className="w-[35%] flex justify-between items-end">
            <p className="text-[#BDBDBD] text-[10px] font-normal">
              Created by Carlos de León
            </p>
            <p className="text-[#BDBDBD] text-[10px] font-normal" >
              devchallenges.io
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

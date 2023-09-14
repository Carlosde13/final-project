export default function Login() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-[15px]">
        <div className="w-1/4 h-[634px] rounded-3xl border border-gray-300 flex flex-col justify-around items-center">
          <div className="w-11/12 h-11/12  pt-[10px] flex flex-col items-center justify-evenly gap-[20px]">
            <div className="w-full flex justify-start items-start">
              <img src="./icons/devchallenges.svg" alt="Page Logo" />
            </div>
            <div className="w-full flex flex-col justify-start items-start g-[10px]">
              <h2 className="text-[#333] font-[Noto Sans] font-semibold text-lg not-italic">
                Login
              </h2>
            </div>
            <form
              action="http://127.0.0.1:8000/api/login"
              method="POST"
              className="w-full flex justify-center items-center flex-col gap-[20px]"
            >
              <div className="w-full h-[48px] rounded-lg border border-gray-300 flex p-[5px] outline-none focus-within:border-2 focus-within:border-gray-700 focus-within:p-2">
                <div className="h-full w-15p flex justify-center items-center">
                  <span className="material-symbols-outlined text-[#828282]">
                    account_circle
                  </span>
                </div>
                <input
                  placeholder="Username"
                  id="usuario"
                  name="usuario"
                  type="text"
                  className="w-4/5 border-none outline-none text-[#828282] font-[Noto Sans] text-[16px] font-normal not-italic"
                />
              </div>
              <div className="w-full h-[48px] rounded-lg border border-gray-300 flex p-[5px] outline-none focus-within:border-2 focus-within:border-gray-700 focus-within:p-2">
                <div className="h-full w-15p flex justify-center items-center">
                  <span className="material-symbols-outlined text-[#828282]">
                    lock
                  </span>
                </div>
                <input
                  placeholder="Password"
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  className="w-4/5 border-none outline-none text-[#828282] font-[Noto Sans] text-[16px] font-normal not-italic"
                />
              </div>
              <input
                type="submit"
                defaultValue="Login"
                id="loginBtn"
                className="w-full h-[38px] border-none outline-none rounded-lg bg-[#2F80ED] text-[#FFF] text-center font-[Noto Sans] text-[16px] font-semibold not-italic hover:cursor-pointer"
              />
            </form>
            <p className="text-[#828282] font-[Noto Sans] text-[14px] not-italic font-normal">
              or continue with these social profile
            </p>
            <div className="w-4/6 flex justify-between items-center">
              <img src="./icons/Google.svg" className="hover:cursor-pointer" />
              <img
                src="./icons/Facebook.svg"
                className="hover:cursor-pointer"
              />
              <img src="./icons/Twitter.svg" className="hover:cursor-pointer" />
              <img src="./icons/Gihub.svg" className="hover:cursor-pointer" />
            </div>
            <div className="w-full flex justify-center gap-[15px]">
              <p className="text-[#828282] font-[Noto Sans] text-[14px] not-italic font-normal">
                Don't have an account yet?
              </p>
              <a
                href="#"
                className="text-[#2D9CDB] text-[14px] font-normal not-italic"
              >
                Register
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-between items-center">
          <p className="text-[#BDBDBD] text-[14px] font-normal">
            Created by Carlos de León
          </p>
          <p className="text-[#BDBDBD] text-[14px] font-normal">
            devchallenges.io
          </p>
        </div>
      </div>
    </>
  );
}

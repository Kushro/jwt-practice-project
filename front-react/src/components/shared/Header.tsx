import Image from "next/image";
import { ArrowRightOnRectangleIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext";

export default function Header() {
  const { auth, logout } = useContext(AuthContext) as AuthContextType;

  const logoutHandler = () => {
    logout();

    location.href = location.origin;
  }

  return (
    <header className="px-6 py-5 bg-orange-500">
      <div className="grid grid-cols-9 items-center">
        <a href="/">
          <Image className="col-span-1" src="https://statics.turecibo.com/media/custom/login/shifta_logo.png" alt="Shifta" width={100} height={0}></Image>
        </a>
        {
          auth ?
          <>
            <div className="col-span-1 text-slate-50">
              <a href="/public-secret" className="font-extralight hover:border-b transition-colors">
                Public secret
              </a>
            </div>
            <div className="col-span-1 text-slate-50">
              <a href="/private-secret" className="font-extralight hover:border-b transition-colors">
                Private secret
              </a>
            </div>
          </>
          :
          <>
          <div className="col-span-2 text-slate-50">
              <a href="/public-secret" className="font-extralight hover:border-b transition-colors">
                Public secret
              </a>
            </div>
          </>
        }
        {
          auth ?
            <>
              <div className="col-span-6 flex justify-end">
                <p className="text-slate-50 mr-3">Bienvenido, {auth.username}!</p>
                <a className="cursor-pointer text-slate-50 hover:text-slate-600 transition-colors" onClick={logout}>
                  <ArrowRightOnRectangleIcon className="w-6 h-6"></ArrowRightOnRectangleIcon>
                </a>
              </div>
            </>
            :
            <>
              <div className="col-span-6 flex justify-end">
                <a href="/login" className='cursor-pointer text-slate-50 hover:text-slate-600 transition-colors'>
                  <KeyIcon className="w-6 h-6"></KeyIcon>
                </a>
              </div>
            </>
        }
      </div>
    </header>
  )
}
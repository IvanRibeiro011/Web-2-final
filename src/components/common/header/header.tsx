'use client';

import React, { useState, useEffect } from "react";
import "./style.css";
import Link from "next/link";
import UserListMenu from "./user-list-menu/user-list-menu";
import userGet from "@/actions/user-get";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, ok } = await userGet();
      setIsLogin(ok); 

      if (!ok) {
        router.push("/login");
      }
    };
    getUser();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="menu">
      <Link href="/contatos">
        <img src="/assets/svgs/logo.svg" alt="Logo" className="logo" />
      </Link>
      {isLogin ? (
        <nav>
          {!isMobile ? (
            <ul>
              <li>
                <Link href="/contatos">Home</Link>
              </li>
              <li>
                <Link href="/cadastrar-contato">Cadastrar Contato</Link>
              </li>
              <li>
                <Link href="/trocar-senha">Trocar Senha</Link>
              </li>
              <li>
                <UserListMenu isMobile={isMobile} />
              </li>
            </ul>
          ) : (
            <UserListMenu isMobile={isMobile} />
          )}
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link href="/register">Cadastre-se</Link>
            </li>
            <li>
              <Link href="/login">Entrar</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

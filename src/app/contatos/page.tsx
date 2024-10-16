import "./page.css";
import "../register/style.css";
import Link from "next/link";
import Contacts from "@/components/contacts/contacts";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="header-my-contacts">
          <h1>Meus contatos</h1>
          <Link href="/cadastrar-contato" className="button" style={{  maxWidth: 'min-content'}}>
            Novo contato
          </Link>
        </div>
        <div className="container-accordion">
          <Contacts />
        </div>
      </div>
    </main>
  );
}

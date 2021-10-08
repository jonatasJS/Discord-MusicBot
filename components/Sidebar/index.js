import React from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <Image
              src="https://cdn.discordapp.com/avatars/819311611864678401/0030b35d800dd30f5648eac2f99b3e87.png?size=2048"
              alt="Ketty Logo"
              width="30"
              height="30"
              style={{borderRadius: "50%"}}
              className="d-inline-block align-text-top"
            />
          </Link>
            <p>Ketty</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{color: "white"}}
            onClick="function re(){ let r = $('#sidebarMenu'); if(r.hasclassName('collapse'))r.removeclassName('collapse');else r.addclassName('collapse')}re()"
          >
            <span className="navbar-toggler-icon" style={{color: "white"}}></span>
          </button>
          <div className="d-flex nav-links">
            <div className="d-flex justify-content-center">
              <Link className="nav-link active" ariaCurrent="page" href="/">Início</Link>
              <Link className="nav-link" href="/#features">Recursos</Link>
              <Link className="nav-link" href="/#commands">Comandos</Link>
            </div>
            <Link
              href="/dashboard"
              className="btn btn-outline-success me-2"
              type="button"
            >
              Painel de controle
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" ariaCurrent="page" href="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/#features">Recursos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/#commands">Comandos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
import React from 'react';
import Sidebar from '../components/Sidebar';
import StyleIndex from '../components/StyleIndex';

const Index = () => {

  return (
    <>
      <h1 className="title">Em breve.</h1>
      <StyleIndex />
    </>
  );
};

export default Index;

/**
 * <section className="main">
      <StyleIndex />
      <Sidebar />

      <div className="hero">
        <div id="hero" className="text-center">
          <h1>Ketty</h1>
          <p>
            Um avançado bot de música discord, suporta Spotify, Soundcloud, YouTube
            com Shuffle, Controle de Volume e Painel de Controle da Web!
          </p>
        </div>
      </div>
      

      <div id="features" className="section-features">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10 col-lg-8">
              <div className="header-section">
                <h2 className="title">RECURSOS <span>EXCLUSIVOS</span></h2>
                <p className="description">
                  Existem muitos recursos na Ketty! 
                  Todas as características incríveis deste bot foram descritas abaixo confira 😉
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="single-service">
                <div className="part-1">
                  <i className="fab fa-spotify"></i>
                  <h3 className="title">Spotify, Sound Cloud, YouTube Support</h3>
                </div>
                <div className="part-2">
                  <p className="description">
                    Use sua playlist do Spotify, vídeos do YouTube ou playlists 
                    do YouTube e muito mais usando a Ketty
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single-service">
                <div className="part-1">
                  <i className="fas fa-music"></i>
                  <h3 className="title">Músicas sem lag</h3>
                </div>
                <div className="part-2">
                  <p className="description">
                    Ketty nunca fica para trás ao tocar uma música em um canal de voz
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="single-service">
                <div className="part-1">
                  <i className="fas fa-sliders-h"></i>
                  <h3 className="title">Configurações do servidor</h3>
                </div>
                <div className="part-2">
                  <p className="description">
                    Controle sua música em looping ou fila, você pode até mudar
                    prefixo do servidor e função dj do servidor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="commands" id="commands">
        <div className="container">
          <h2 className="title text-center">Comandos</h2>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Comando</th>
                <th scope="col">Apelido</th>
                <th scope="col">Uso</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody id="commands-body"></tbody>
          </table>
        </div>
      </div>
      
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-text">
                <p>
                  © 2021
                  <a href="//github.com/jonatasJS/Discord-MusicBot"
                    >Discord Music Bot</a
                  >. All rights reserved. Made by
                  <a href="//github.com/jonatasJS">Jonatas S. Soares</a> and its
                  <a
                    href="//github.com/jonatasJS/Discord-MusicBot/graphs/contributors"
                    >colaboradores</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
 */
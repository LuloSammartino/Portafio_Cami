import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { projects } from './projects';
import './style.css';

function Cover({ project }) {
  return <img src={project.cover} alt={project.title} loading="lazy" />;
}

function App() {
  const [page, setPage] = useState('work');
  const [selected, setSelected] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const dialog = useRef(null);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('camicarlevaro@gmail.com');
      setCopyStatus('Correo copiado.');
    } catch {
      setCopyStatus('No se pudo copiar. Podés seleccionar el correo y copiarlo manualmente.');
    }
  }
  function navigate(next) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function openProject(project) {
    setSelected(project);
    dialog.current.showModal();
  }
  return <>
    <a className="skip-link" href="#content">Ir al contenido</a>
    <header className="site-header">
      <nav aria-label="Navegación principal">
        <button className={page === 'work' ? 'active' : ''} aria-current={page === 'work' ? 'page' : undefined} onClick={() => navigate('work')}>Proyectos</button>
        <button className={page === 'about' ? 'active' : ''} aria-current={page === 'about' ? 'page' : undefined} onClick={() => navigate('about')}>Sobre mí & contacto</button>
      </nav>
      <a className="name" href="#" onClick={(event) => { event.preventDefault(); navigate('work'); }}>Camila Carlevaro</a>
      <span className="header-caption">Portfolio</span>
    </header>
    <main id="content">
      {page === 'work' ? <>
        <section className="gallery" aria-label="Proyectos">
          {projects.map((project) => <button className="project" key={project.id} onClick={() => openProject(project)} aria-label={`Ver ${project.title}`}>
            <Cover project={project} />
            <div className="project-overlay"><h2>{project.title}</h2><p>{project.category || project.year}</p></div>
          </button>)}
        </section>
      </> : <section className="about">
        <h1>Sobre mí & contacto</h1>
        <p className="about-name">Camila Carlevaro</p>
        <p>Diseñadora de Imagen y Sonido graduada de la UBA, realizadora audiovisual, editora de video y fotógrafa con experiencia en edición, postproducción, motion graphics y dirección y producción en set. Manejo del paquete Adobe y herramientas de Inteligencia Artificial integradas al flujo de trabajo. Acostumbrada a trabajar con distintos clientes, formatos y plataformas con criterio estético y narrativo, autonomía y buena comunicación en equipo. Busco aportar versatilidad técnica y sensibilidad creativa a proyectos audiovisuales desde la preproducción hasta la entrega final. Como proyectos destacados, dirigí el corto <em>La cautiva</em> y me desarrollé como montajista en mi tesis final: <em>Donde fuimos por última vez</em>.</p>
        <section className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contacto</h2>
          <p><a href="mailto:camicarlevaro@gmail.com">camicarlevaro@gmail.com</a></p>
          <button className="back-button" onClick={copyEmail}>Copiar correo</button>
          <p role="status">{copyStatus}</p>
        </section>
        <button className="back-button" onClick={() => navigate('work')}>Ver proyectos →</button>
      </section>}
      <footer>© {new Date().getFullYear()} Camila Carlevaro</footer>
    </main>
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Volver arriba">↑</button>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onClose={() => setSelected(null)}>
      <button className="close-dialog" onClick={() => dialog.current.close()} aria-label="Cerrar proyecto">×</button>
      {selected && <article><h2 id="project-title">{selected.title}</h2><p>{selected.description}</p>{selected.video ? <><iframe key={selected.video} src={selected.video} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><a href={selected.video.replace('/embed/', '/watch?v=')} target="_blank" rel="noopener noreferrer">Ver en YouTube</a></> : <Cover project={selected} />}{selected.images?.map((src, index) => <img key={src} src={src} alt={`${selected.title}: imagen ${index + 1}`} loading="lazy" />)}</article>}
    </dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

import React,{useEffect} from 'react'
import Editor from './Editor'
import uselocalStorage from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './Dashboard';

export default function DisplayEditor() {
    const [html, setHtml] = uselocalStorage('html', '')
  const [css, setCss] = uselocalStorage('css', '')
  const [js, setJs] = uselocalStorage('js', '')
  const [srcDoc, setSrcDoc] = uselocalStorage('')

  const clearStorage = () => {
    setHtml('');
    setCss('');
    setJs('');
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
       <body>${html}</body>
       <style>${css}</style>
       <script>${js}</script>
      </html>
      `)
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);


  return (
    <>
    <div className="nav-bar">
      <div className="page-title">
        <h1>Welcome to my <span>CODE@Editor👋</span></h1>
      </div>
      <div className="nav-components"> 
          <a className="nav-link" href="./aboutProject.html" target="_blank">_aboutProject();</a>
          <Dashboard className="user-button"></Dashboard>
      <button
      type="button"
      onClick={ clearStorage }
      className="refresh-button">
        <FontAwesomeIcon icon={faRefresh} size="lg" />
      </button>
      </div>
    </div>
    <div className="pane top-pane">
    <div className="stars"></div>
    <div className="twinkling"></div>
    <div className="clouds"></div>
      <Editor 
      language="xml" 
      displayName="HTML" 
      value={html} 
      onChange={setHtml} 
      />
      <Editor 
      language="css" 
      displayName="CSS"
      value={css}
      onChange={setCss}
      />
      <Editor 
      language="javascript" 
      displayName="JS"
      value={js}
      onChange={setJs}
      />
    </div>
    <div className="pane">
      <iframe
      srcDoc={srcDoc}
      title="output" 
      sandbox="allow-scripts" 
      frameBorder="0" 
      width="100%" 
      height="100%" 
      />
    </div>
    </>
  )
}

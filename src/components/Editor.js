import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt, faDownload } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
  const {
   language,
   displayName,
   value,
   onChange
  } = props

  const [open, setOpen] = useState(true)
  
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile." + displayName.toLowerCase();
    document.body.appendChild(element);
    element.click();
  };

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
       <div className="editor-title">
         { displayName }
         <div>
         <button
         type="button"
         className="expand-collapse-btn" 
         onClick={() => setOpen(prevOpen => !prevOpen)}>
           <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
         </button>
         <button onClick={downloadTxtFile} className="download-btn"><FontAwesomeIcon icon={faDownload} /></button>
         </div>
       </div>
       <ControlledEditor
       onBeforeChange={handleChange}
       value={value}
       className="editor-body"
       options={{
         lineWrapping: true,
         lint: true,
         mode: language,
         theme: 'dracula',
         lineNumbers: true,
         autoCloseTags: true,
         autoCloseBrackets: true,
         comment: true,
         tabSize: 5,
         extraKeys: {
           'Ctrl-Space': 'autocomplete',
           'Ctrl-/': 'toggleComment',
           'Ctrl-F': 'Start Searching',
           'Ctrl-G': 'Find next',
           'Shift-Ctrl-G': 'Find previous',
           'Shift-Ctrl-F': 'Replace',
           'Shift-Ctrl-R': 'Replace all',
           'Alt-G': 'Jump to line',
          }
       }}
       />
    </div>
  )
}
import React, { useState } from 'react';
import './App.css';
import { Notebook } from './components/Notebook';
import { NotebookData } from './models/NotebookData';

const sampleNotebook: NotebookData = {
  title: 'It is the title',
  sections: [
    {
      header: 'Section 1',
      blocks: [
        {
          code: 'Let \\( x \\in X \\).'
        }
      ]
    },
    {
      header: 'The second section',
      blocks: [
        {
          code: ''
        },
        {
          code: ''
        }
      ]
    }
  ]
}

function App() {
  const [notebookData, setNotebookData] = useState<NotebookData>(sampleNotebook)

  return (
    <div className="App">
      <nav>
        <div></div>
        <header><h1>Digi TeX Note</h1></header>
      </nav>
      <main>
        <Notebook
          data={notebookData}
          setData={setNotebookData}
        />
      </main>
    </div>
  );
}

export default App;

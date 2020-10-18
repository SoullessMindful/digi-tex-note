import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Notebook } from './components/Notebook';
import { EMPTY_NOTEBOOK_DATA, NotebookData } from './models/NotebookData';

const StyledNavButton = styled.button`
  background-color: hsl(210, 30%, 25%);
  border: none;
  color: white;
  height: 100%;
  border-right: 1px solid white;
  padding: 0 1rem;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: hsl(210, 30%, 30%);
  }
`

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

  const openNotebook: () => void
    = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.dtxn'
      input.multiple = false
      input.onchange = () => {
        const files = input.files ?? []
        const file = files[0]
        if (file !== undefined) {
          file.text()
            .then((text) => JSON.parse(text))
            .then((json) => NotebookData(json))
            .then((data) => (data !== null) ? setNotebookData(data) : null )
        }
      }
      input.click()
    }

  const saveNotebook: () => void
    = () => {
      const a = document.createElement('a')
      a.download = 'file.dtxn'
      a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(notebookData))
      a.click()
    }

  return (
    <div className="App">
      <nav>
        <div>
          <StyledNavButton
            onClick={() => setNotebookData(EMPTY_NOTEBOOK_DATA)}
          >
            New
          </StyledNavButton>
          <StyledNavButton
            onClick={openNotebook}
          >
            Open
          </StyledNavButton>
          <StyledNavButton
            onClick={saveNotebook}
          >
            Save
          </StyledNavButton>
        </div>
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

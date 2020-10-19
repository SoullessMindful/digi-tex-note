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
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;

  &:hover {
    background-color: hsl(210, 30%, 30%);
  }
`

const StyledCheckbox = styled.div`
  display: inline-block;
  padding: 0 0.5rem;
  font-weight: bold;
  background-color: hsl(210, 30%, 25%);
  border-right: 1px solid white;
  height: 100%;
  label {
    cursor: pointer;
    line-height: 2rem;

    input[type=checkbox] {
      visibility: hidden;
      width: 0;
      height: 0;
    }

    span {
      margin-right: 0.5rem;
      border-radius: 0.75rem;
      display: inline-block;
      width: 1.5rem;
      height: 0.75rem;
      background-color: white;
      position: relative;
      top: 0.1rem;
      &::before {
        display: inline-block;
        height: 84%;
        width: 42%;
        border-radius: 50%;
        background-color: hsl(0, 0%, 50%);
        position: absolute;
        left: 8%;
        top: 8%;
        content: '';
        transition: 0.2s;
      }
      &:active::before {
        width: 63%;
      }
    }

    input[type=checkbox]:checked + span {
      &::before {
        left: 92%;
	      transform: translateX(-100%);
        background-color: hsl(210, 100%, 50%);
      }
    }

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
  const [showCode, setShowCode] = useState<boolean>(true);

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
          <StyledCheckbox>
            <label>
              <input type="checkbox" checked={showCode} onChange={(ev) => setShowCode(ev.target.checked)} />
              <span></span>
              Show Code
            </label>
          </StyledCheckbox>
        </div>
        <header><h1>Digi TeX Note</h1></header>
      </nav>
      <main>
        <Notebook
          data={notebookData}
          setData={setNotebookData}
          showCode={showCode}
        />
      </main>
    </div>
  );
}

export default App;

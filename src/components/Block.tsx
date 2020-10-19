import React, { FunctionComponent, FormEvent } from "react"
import styled from 'styled-components'
import { BlockData } from "../models/NotebookData"
import { DeleteButton } from "./utils/DeleteButton"
import { TeX } from "./Tex"

interface ShowCode {
  showCode?: boolean
}

const StyledBlock = styled.div<ShowCode>`
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: stretch;
  width: 100%;
  margin: 0.5rem 0;

  &>* {
    min-height: 200px;
    width: ${({showCode}) => (showCode ?? true) ? '45%' : '90%'};
    color: black;
    text-align: left;
  }

  &>.tex {
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.2rem;
  }

  textarea {
    font-size: inherit;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    padding-top: calc(0.5rem + 1em);
    border: 2px solid hsl(0, 0%, 50%);
    resize: none;
    outline: none;
    border-radius: 0.2rem;
  }

  textarea:focus {
    border: 2px solid hsl(210, 100%, 50%);
  }
`

const StyledCode = styled.span<ShowCode>`
  position: relative;
  ${(p) => (p.showCode ?? true) ? '' : 'display: none;'}
`

const StyledBar = styled.div`
  position: absolute;
  width: 100%;
  height: 1em;
  top: 0;
  left: 0;
  padding: 2px 2px 0 2px;

  .btn-delete {
    float: right;
  }
`

interface BlockProps {
  data: BlockData
  setData: (data: BlockData) => void
  deleteData: () => void
  showCode?: boolean
}

export const Block: FunctionComponent<BlockProps> = ({
  data,
  setData,
  deleteData,
  showCode
}) => {
  const { code } = data

  const setCode: (newCode: string) => void
    = (newCode) => setData({
      ...data,
      code: newCode
    })

  const onTextAreaInput = (ev: FormEvent<HTMLTextAreaElement>) => {
    const textArea = ev.target as HTMLTextAreaElement
    setCode(textArea.value)
  }

  return (
    <StyledBlock showCode={showCode}>
      <StyledCode showCode={showCode}>
        <StyledBar>
          <DeleteButton onClick={deleteData} inverted/>
        </StyledBar>
        <textarea value={code} onChange={(onTextAreaInput)}></textarea>
      </StyledCode>
      <TeX code={code}/>
    </StyledBlock>
  )
}

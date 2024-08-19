import React, { FormEvent, FunctionComponent } from 'react'
import styled from 'styled-components'
import { TeXBlockData } from '../models/NotebookData'
import { BlockProps, BlockTypeProps, FloatLeft, FloatRight, ShowCode, StyledBar } from './Block'
import { TeX } from './Tex'
import { BlockTypePicker } from './utils/BlockTypePicker'
import { DeleteButton } from './utils/DeleteButton'

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

export const TeXBlock: FunctionComponent<BlockProps<TeXBlockData> & BlockTypeProps> = ({
  data,
  setData,
  deleteData,
  showCode,
  type,
  setType,
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
          <FloatLeft>
            <BlockTypePicker
              type={type}
              setType={setType}
            />
          </FloatLeft>
          <FloatRight>
            <DeleteButton onClick={deleteData} inverted/>
          </FloatRight>
        </StyledBar>
        <textarea value={code} onChange={(onTextAreaInput)}></textarea>
      </StyledCode>
      <TeX code={code}/>
    </StyledBlock>
  )
}

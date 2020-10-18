import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledTextBox = styled.input`
  font-size: inherit;
  font-weight: inherit;
  width: 100%;
  text-align: center;
  display: inline-block;
  background-color:  hsl(220, 13%, 22%);
  color: white;
  border: none;
  border-radius: 0.2rem;
  
  &:focus {
    background-color: white;
    color: black
  }
`

interface TextBoxProps {
  data: string
  setData: (data: string) => void
}

export const TextBox: FunctionComponent<TextBoxProps> = ({
  data,
  setData
}) => (
  <StyledTextBox
    type="text"
    value={data}
    onChange={(ev) => {
      const target = ev.target as HTMLInputElement
      setData(target.value)
    }}
  />
)

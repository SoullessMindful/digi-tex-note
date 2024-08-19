import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { BlockType } from '../Block';

const StyledContainer = styled.div`
  width: 2.5rem;
  height: 0.75rem;
  background: blue;
`


const StyledSelect = styled.select`
  position: absolute;
  bottom: -2px;
  left: 2px;
  font-size: 0.5rem;
  height: 0.75rem;
  width: 2.5rem;
`

interface BlockTypePickerProps {
  type: BlockType
  setType: (type: BlockType) => void
}

export const BlockTypePicker: FunctionComponent<BlockTypePickerProps> = ({
  type,
  setType,
}) => (
  <StyledContainer>
    <StyledSelect
      value={type}
      onChange={(e) => {
        switch (e.target.value) {
          case 'img':
            setType('img');
            break;
          case 'tex':
            setType('tex');
          break;
        }
      }}
    >
      <option value="tex">LaTeX</option>
      <option value="img">Image</option>
    </StyledSelect>
  </StyledContainer>
)

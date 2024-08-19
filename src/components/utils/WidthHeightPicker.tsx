import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  margin-right: 0.5rem;
  & > div {
    margin-right: 0.5rem;
    font-size: 0.5rem;
  }
`

const StyledInputContainer = styled.div`
  position: relative;
  width: 2.5rem;
  height: 0.75rem;
  background: blue;
`

const StyledInput = styled.input`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.75rem;
  width: 2.5rem;
  font-size: 0.5rem;
  height: 0.75rem;
`

interface WidthHeightPickerProps {
  width: number
  setWidth: (width: number) => void
  height: number
  setHeight: (length: number) => void
}

export const WidthHeightPicker: FunctionComponent<WidthHeightPickerProps> = ({
  width,
  setWidth,
  height,
  setHeight,
}) => (
<Fragment>
  <StyledContainer>
    <div>Width: </div>
    <StyledInputContainer>
      <StyledInput
        type="number"
        value={width}
        onChange={e => setWidth(Number.parseInt(e.target.value))}
      />
    </StyledInputContainer>
  </StyledContainer>
  <StyledContainer>
    <div>Height: </div>
    <StyledInputContainer>
      <StyledInput
        type="number"
        value={height}
        onChange={e => setHeight(Number.parseInt(e.target.value))}
      />
    </StyledInputContainer>
  </StyledContainer>
</Fragment>
)

import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import icon from './addButton.svg'

const StyledDiv = styled.div`
  display: inline-flex;
  width: calc(100% - 0.5rem);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  align-items: center;
`
interface StyledPlusProps {
  inverted?: boolean
}

const StyledPlus = styled.img<StyledPlusProps>`
  color: white;
  height: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
  ${({inverted}) => (inverted ?? false) ? 'filter: invert(100%);' : ''}
`

const StyledLine = styled.div`
  height: 1px;
  background-color: white;/* hsl(0, 0%, 50%);*/
  flex-grow: 1;
  margin: 0 0.5rem;
`

interface AddButtonProps extends StyledPlusProps {
  onClick?: () => void
}

export const AddButton: FunctionComponent<AddButtonProps> = ({
  onClick,
  inverted
}) => (
  <StyledDiv className="btn-add">
    <StyledPlus
      onClick={onClick}
      inverted={inverted}
      src={icon}
      alt="+"
    />
    <StyledLine></StyledLine>
  </StyledDiv>
)

import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import icon from './deleteButton.svg'

interface StyledBinProps {
  inverted?: boolean
}

const StyledBin = styled.img<StyledBinProps>`
  height: 0.75rem;
  width: 0.75rem;
  cursor: pointer;
  ${({inverted}) => (inverted ?? false) ? 'filter: invert(100%);' : ''}
`

interface DeleteButtonProps extends StyledBinProps {
  onClick?: () => void
}

export const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
  onClick,
  inverted
}) => (
  <div className="btn-delete">
    <StyledBin
      onClick={onClick}
      inverted={inverted}
      src={icon}
      alt="+"
    />
  </div>
)

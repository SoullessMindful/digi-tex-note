import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import pl from './pl.svg'
import en from './en.svg'
import es from './es.svg'
import { Language } from '../../App'

const StyledNavContainer = styled.button`
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

const StyledSelect = styled.span`
  display: inline-flex;
  position: relative;
  height: 100%;
  font-size: 2rem;
  align-items: center;
`

const StyledFlag = styled.img`
  width: 1.2rem;
  cursor: pointer;
  &:hover {
    box-shadow:
      0.3rem 0.25rem 0.4rem hsl(0, 0%, 75%),
      -0.3rem 0.25rem 0.4rem hsl(0, 0%, 75%),
      0.3rem -0.25rem 0.4rem hsl(0, 0%, 75%),
      -0.3rem -0.25rem 0.4rem hsl(0, 0%, 75%);
  }
`

const StyledOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 100%;
  left: calc(-1rem - 1px);
  background-color: hsl(210, 30%, 25%);
  border: 1px solid white;
  width: calc(100% + calc(2rem + 2px));

  & > img {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`

interface LanguageSelectProps {
  language: Language
  setLanguage: (newLanguage: Language) => void
}

function languageToFlag(language: Language): string {
  switch (language) {
    case 'EN': return en
    case 'PL': return pl
    case 'ES': return es
  }
}

export const LanguageSelect: FunctionComponent<LanguageSelectProps> = ({
  language,
  setLanguage,
}) => {
  const [isUnfolded, setIsUnfolded] = useState(false);

  return (
  <StyledSelect>
    <StyledFlag
      src={languageToFlag(language)}
      alt={language}
      onClick={() => setIsUnfolded(!isUnfolded)}
    />
    {isUnfolded && <StyledOptions>
      <StyledFlag
        src={en}
        alt="EN"
        onClick={() => {
          setLanguage('EN')
          setIsUnfolded(false)
        }}
      />
      <StyledFlag
        src={pl}
        alt="PL"
        onClick={() => {
          setLanguage('PL')
          setIsUnfolded(false)
        }}
      />
      <StyledFlag
        src={es}
        alt="ES"
        onClick={() => {
          setLanguage('ES')
          setIsUnfolded(false)
        }}
      />
    </StyledOptions>}
  </StyledSelect>
)
}

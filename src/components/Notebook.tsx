import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import { EMPTY_SECTION_DATA, NotebookData, SectionData } from '../models/NotebookData'
import { addArrayMember, deleteArrayMember, setArrayMember } from '../utils/dataUtils'
import { AddButton } from './utils/AddButton'
import { Section } from './Section'
import { TextBox } from './utils/TextBox'

const StyledNotebook = styled.div`
  width: calc(100% - 0.5rem);
  display: inline-block;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid hsl(0, 0%, 50%);
  border-radius: 0.5rem;
`

const StyledH = styled.h2`
  position: relative;
  margin: 0.5rem;
`

interface NotebookProps {
  data: NotebookData
  setData: (data: NotebookData) => void
}

export const Notebook: FunctionComponent<NotebookProps> = ({
  data,
  setData
}) => {
  const { title, sections } = data

  const setTitle: (val: string) => void
    = (val) => setData({
      ...data,
      title: val
    })

  const setSectionData: (i: number) => (section: SectionData) => void
    = (i) => (section) => setData({
      ...data,
      sections: setArrayMember(sections, section, i)
    })

  const addSectionData: (i?: number) => () => void
    = (i) => () => setData({
      ...data,
      sections: addArrayMember(
        sections,
        EMPTY_SECTION_DATA,
        i
      )
    })

  const deleteSectionData: (i: number) => () => void
    = (i) => () => setData({
      ...data,
      sections: deleteArrayMember(
        sections,
        i
      )
    })

  return (
    <StyledNotebook>
      <StyledH><TextBox
        data={title}
        setData={setTitle}
      /></StyledH>
          {
            sections.map((section, i) => (<Fragment key={`section-${i}`}>
              <AddButton onClick={addSectionData(i)}/>
              <Section
                data={section}
                setData={setSectionData(i)}
                deleteData={deleteSectionData(i)}
              />
            </Fragment>))
          }
      <AddButton onClick={addSectionData()} />
    </StyledNotebook>
  )
}

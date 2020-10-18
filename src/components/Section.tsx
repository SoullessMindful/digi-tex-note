import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import { BlockData, EMPTY_BLOCK_DATA, SectionData } from '../models/NotebookData'
import { addArrayMember, deleteArrayMember, setArrayMember } from '../utils/dataUtils'
import { AddButton } from './utils/AddButton'
import { Block } from './Block'
import { DeleteButton } from './utils/DeleteButton'
import { TextBox } from './utils/TextBox'

const StyledSection = styled.div`
  width: calc(100% - 0.5rem);
  display: inline-block;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid hsl(0, 0%, 50%);
  border-radius: 0.5rem;
`

const StyledH = styled.h3`
  position: relative;
  margin: 0.5rem;

  .btn-delete {
    position: absolute;
    right: 5px;
    top: 0;
  }
`

interface SectionProps {
  data: SectionData
  setData: (data: SectionData) => void
  deleteData: () => void
}

export const Section: FunctionComponent<SectionProps> = ({
  data,
  setData,
  deleteData
}) => {
  const { header, blocks } = data

  const setHeader: (val: string) => void
    = (val) => setData({
      ...data,
      header: val
    })

  const setBlockData: (i: number) => (block: BlockData) => void
    = (i) => (block) => setData({
      ...data,
      blocks: setArrayMember(blocks, block, i)
    })

  const addBlockData: (i?: number) => () => void
    = (i) => () => setData({
      ...data,
      blocks: addArrayMember(
        blocks,
        EMPTY_BLOCK_DATA,
        i
      )
    })

  const deleteBlockData: (i: number) => () => void
    = (i) => () => setData({
      ...data,
      blocks: deleteArrayMember(
        blocks,
        i
      )
    })

  return <StyledSection>
    <StyledH>
      <TextBox
        data={header}
        setData={setHeader}
      />
      <DeleteButton onClick={deleteData}/>
    </StyledH>
    {
      blocks.map((block, i) => (<Fragment>
        <AddButton onClick={addBlockData(i)} />
        <Block
          data={block}
          setData={setBlockData(i)}
          deleteData={deleteBlockData(i)}
        />
      </Fragment>))
    }
    <AddButton onClick={addBlockData()} />
  </StyledSection>
}

import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ImgBlockData, NotebookResourceImg } from '../models/NotebookData'
import { BlockProps, StyledBar, FloatRight, BlockTypeProps, FloatLeft } from './Block'
import { DrawingCanvas } from './DrawingCanvas'
import { BlockTypePicker } from './utils/BlockTypePicker'
import { DeleteButton } from './utils/DeleteButton'
import { WidthHeightPicker } from './utils/WidthHeightPicker'

const StyledBlock = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: stretch;
  width: 100%;
  margin: 0.5rem 0;

  &>* {
    position: relative;
    color: black;
    text-align: left;
  }
`

export const ImgBlock: FunctionComponent<BlockProps<ImgBlockData> & BlockTypeProps> = ({
  data,
  setData,
  deleteData,
  type,
  setType,
}) => {
  const { resource } = data

  const setResource: (newResource: NotebookResourceImg) => void
    = (newResource) => setData({
      ...data,
      resource: newResource
    })

  return (
    <StyledBlock>
      <span>
        <StyledBar>
          <FloatLeft>
            <BlockTypePicker
              type={type}
              setType={setType}
            />
            <WidthHeightPicker
              width={resource.width}
              setWidth={(newWidth) => setResource({
                ...resource,
                width: newWidth
              })}
              height={resource.height}
              setHeight={(newHeight) => setResource({
                ...resource,
                height: newHeight
              })}
            />
          </FloatLeft>
          <FloatRight>
            <DeleteButton onClick={deleteData} inverted />
          </FloatRight>
        </StyledBar>
        <DrawingCanvas
          resource={resource}
          setResource={setResource}
        />
      </span>
    </StyledBlock>
  )
}

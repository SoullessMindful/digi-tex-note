import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { BlockData, emptyBlockData, emptyImgBlockData } from "../models/NotebookData"
import { ImgBlock } from "./ImgBlock"
import { TeXBlock } from "./TeXBlock"

export interface ShowCode {
  showCode?: boolean
}

export const StyledBar = styled.div`
  position: absolute;
  width: 100%;
  height: 0.75rem;
  top: 0;
  left: 0;
  padding: 2px 2px 0 2px;

  &>* {
    height: 0.75rem;
  }
`

export const FloatLeft = styled.span`
  float: left;
  display: flex;
  & > div {
    margin-right: 1rem;
  }
`

export const FloatRight = styled.span`
  float: right;
`


export interface BlockProps<T extends BlockData> {
  data: T
  setData: (data: BlockData) => void
  deleteData: () => void
  showCode?: boolean
}

export type BlockType = 'tex' | 'img'

export interface BlockTypeProps {
  type: BlockType,
  setType: (type: BlockType) => void,
}

export const Block: FunctionComponent<BlockProps<BlockData>> = ({
  data,
  setData,
  deleteData,
  showCode
}) => {
  const [type, setType] = useState(data.type)

  const setTypeExt = (newType: BlockType) => {
    if (newType !== data.type) {
      switch (newType) {
        case 'tex':
          setData(emptyBlockData())
          break
        case 'img':
          setData(emptyImgBlockData())
          break
      }
    }
  }

  useEffect(() => {
    if (type !== data.type) {
      setType(data.type)
    }
  }, [data, type])

  switch (data.type) {
    case 'tex':
      return <TeXBlock
        data={data}
        setData={setData}
        deleteData={deleteData}
        showCode={showCode}
        type={type}
        setType={setTypeExt}
      />
    case 'img':
      return <ImgBlock
        data={data}
        setData={setData}
        deleteData={deleteData}
        type={type}
        setType={setTypeExt}
      />
  }
}

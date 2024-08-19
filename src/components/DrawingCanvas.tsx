import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NotebookResourceImg } from '../models/NotebookData'

const StyledCanvas = styled.canvas`
  background-color: white;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  touch-action: none;
`

interface CanvasProps {
  resource: NotebookResourceImg
  setResource: (newResource: NotebookResourceImg) => void
}

export const DrawingCanvas: FunctionComponent<CanvasProps> = ({
  resource,
  setResource,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (canvas === null) return

  // }, [])

  useEffect(() => {
    if (canvasRef.current === null) return

    if (canvasRef.current.toDataURL('image/png') !== resource.src) {
      const newImg = new window.Image();
      newImg.onload = () => canvasRef.current?.getContext("2d")?.drawImage(newImg, 0, 0)
      newImg.src = resource.src
    }
  }, [resource])

  const initDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvasRef.current === null) return

    const context = canvasRef.current.getContext('2d')
    if (context === null) return

    context.beginPath()
    context.moveTo(nativeEvent.offsetX, nativeEvent.offsetY)

    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (canvasRef.current === null) return

    const context = canvasRef.current.getContext('2d')
    if (context === null) return

    context.closePath()

    setIsDrawing(false)

    setResource({
      ...resource,
      src: canvasRef.current.toDataURL('image/png'),
    })
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return

    if (canvasRef.current === null) return

    const context = canvasRef.current.getContext('2d')
    if (context === null) return

    context.lineTo(nativeEvent.offsetX, nativeEvent.offsetY)
    context.stroke()
  }

  const initDrawingTouch = ({ nativeEvent }: React.TouchEvent<HTMLCanvasElement>) => {
    if (canvasRef.current === null) return

    const context = canvasRef.current.getContext('2d')
    if (context === null) return

    const rect = canvasRef.current.getBoundingClientRect()

    context.beginPath()
    context.moveTo(
      nativeEvent.touches[0].clientX - rect.left,
      nativeEvent.touches[0].clientY - rect.top
    )

    setIsDrawing(true)
  }

  const drawTouch = ({ nativeEvent }: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    if (canvasRef.current === null) return

    const rect = canvasRef.current.getBoundingClientRect()

    const context = canvasRef.current.getContext('2d')
    if (context === null) return

    context.lineTo(
      nativeEvent.touches[0].clientX - rect.left,
      nativeEvent.touches[0].clientY - rect.top
    )
    context.stroke()
  }

  return (
    <StyledCanvas
      width={resource.width}
      height={resource.height}
      ref={canvasRef}
      onMouseMove={draw}
      onMouseDown={initDrawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
      onTouchMove={drawTouch}
      onTouchStart={initDrawingTouch}
      onTouchEnd={finishDrawing}
    ></StyledCanvas>
  )
}

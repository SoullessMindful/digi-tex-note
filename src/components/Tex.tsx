import React, { FunctionComponent } from 'react'
import katex from 'katex'
import 'katex/dist/katex.css'
import { parseTeX, Paragraph } from '../parsers/texParser'

interface TeXProps {
  code: string
}

interface ParagraphProps {
  paragraphData: Paragraph
}

export const InlineTeX: FunctionComponent<TeXProps> = ({code}) => {

  return (
    <span dangerouslySetInnerHTML={{__html: texToHtml(code)}}></span>
  )
}

export const DisplayTeX: FunctionComponent<TeXProps> = ({code}) => {

  return (
    <span dangerouslySetInnerHTML={{__html: texToHtml(code, true)}}></span>
  )
}

export const TextParagraph: FunctionComponent<ParagraphProps> = ({paragraphData}) => {

  return <p>
    {paragraphData.value.map((el, i) => (
      el.type === 'InlineTeX' ?
        <InlineTeX key={`inline-tex-${i}`} code={el.value}/> :
        el.value
    ))}
  </p>

}

export const TeX: FunctionComponent<TeXProps> = ({code}) => {

  const parsedTeX = parseTeX(code)

  return <div className="tex">
    {parsedTeX.map((el, i) => (
      el.type === 'DisplayTeX' ?
        <DisplayTeX key={`display-tex-${i}`} code={el.value} /> :
        <TextParagraph key={`text-paragraph-${i}`} paragraphData={el} />
    ))}
  </div>
}

const texToHtml: (code: string, displayMode?: boolean) => string
  = (code, displayMode = false) => {
  try {
    return katex.renderToString(
      code,
      {
        output: 'html',
        displayMode
      }
    )
  } catch(e) {
    console.log('nope')
    return code
  }
}

import { many, oneOf, regexpMatch } from "parseriver"

const prepareCode: (code: string) => string
  = (code) => code
    .replace(/^\n*/, '')
    .replace(/\n+/g, '\n')

interface Character {
  type: 'Character'
  value: string
}

interface InlineTeXData {
  type: 'InlineTeX'
  value: string
}

interface DisplayTeXData {
  type: 'DisplayTeX'
  value: string
}

interface Text {
  type: "Text"
  value: string
}

interface NewLine {
  type: "Newline"
}

interface Paragraph {
  type: 'Paragraph'
  value: Array<Text | InlineTeXData>
}

const newLine: NewLine = {
  type: 'Newline'
}

type FirstPhaseTeXData = Character | InlineTeXData | DisplayTeXData
type SecondPhaseTeXData = Text | NewLine | InlineTeXData | DisplayTeXData
type ThirdPhaseTeXData = Paragraph | DisplayTeXData

const characterParser = regexpMatch(/^.|\n/)
  .map((match) => ({
    type: 'Character',
    value: match[0] ?? ''
  }))
const inlineParser = regexpMatch(/^\\\((((?!\\\)|\\\().|\n)*)\\\)/)
  .map((match) => ({
    type: 'InlineTeX',
    value: match[1] ?? ''
  }))
const displayParser = regexpMatch(/^\\\[(((?!\\\]|\\\[).|\n)*)\\\]/)
  .map((match) => ({
    type: 'DisplayTeX',
    value: match[1] ?? ''
  }))

const firstPhaseToSecond: (el: FirstPhaseTeXData) => SecondPhaseTeXData
  = (el) => (el.type === 'Character' ? ({
    type: 'Text',
    value: el.value
  }) : el)

const secondPhaseToThird: (el: SecondPhaseTeXData) => ThirdPhaseTeXData
  = (el) => (el.type === 'DisplayTeX' ? el : ({
    type: 'Paragraph',
    value: (el.type === 'Newline') ? [] : [el]
  }))

const texParser = many(oneOf(
  displayParser,
  inlineParser,
  characterParser
)).map((result: FirstPhaseTeXData[]) => result.reduce<SecondPhaseTeXData[]>(
  (total, el) => {
    if (el.value === '\n') return [...total, newLine]
    
    if (
      el.type !== 'Character' ||
      total.length === 0 ||
      total[total.length - 1].type !== 'Text'
    ) return [...total, firstPhaseToSecond(el)]

    ;(total[total.length - 1] as Text).value += el.value
    return total
  },
  []
)).map((result) => result.reduce<ThirdPhaseTeXData[]>(
  (total, el) => {
    if (
      el.type === 'DisplayTeX' ||
      el.type === 'Newline' ||
      total.length === 0 ||
      total[total.length - 1].type === 'DisplayTeX'
    ) return [...total, secondPhaseToThird(el)]
    
    ;(total[total.length - 1] as Paragraph).value.push(el)
    return total
  },
  []
))

export const parseTeX: (code: string) => ThirdPhaseTeXData[]
  = (code) => {
    const preparedCode = prepareCode(code)
    const state = texParser.run(preparedCode)

    return state.__type__==='ResultState' ? state.result : []
  }

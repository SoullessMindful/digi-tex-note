export interface NotebookData {
  title: string
  sections: SectionData[]
}

export interface SectionData {
  header: string
  blocks: BlockData[]
}

export interface BlockData {
  code: string
}

export const EMPTY_BLOCK_DATA = {
  code: ''
}

export const EMPTY_SECTION_DATA = {
  header: 'New Section',
  blocks: [
    EMPTY_BLOCK_DATA
  ]
}

export const EMPTY_NOTEBOOK_DATA = {
  title: 'New Notebook',
  sections: [
    EMPTY_SECTION_DATA
  ]
}

export const BlockData: (obj: any) => BlockData | null
  = (obj) => typeof(obj) === 'object' ?
    {
      code: obj.code ?? ''
    } : null

export const SectionData: (obj: any) => SectionData | null
  = (obj) => typeof(obj) === 'object' ?
    {
      header: obj.header ?? '',
      blocks: Array.isArray(obj.blocks) ?
        (obj.blocks as Array<any>)
          .map((block) => BlockData(block))
          .filter((block) => block !== null) as BlockData[] :
        []
    } : null

export const NotebookData: (obj: any) => NotebookData | null
  = (obj) => typeof(obj) === 'object' ?
    {
      title: obj.title ?? '',
      sections: Array.isArray(obj.sections) ?
        (obj.sections as Array<any>)
          .map((section) => SectionData(section))
          .filter((section) => section !== null) as SectionData[] :
          []
    } : null

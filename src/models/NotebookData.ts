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

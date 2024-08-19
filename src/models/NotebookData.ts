import {v4} from 'uuid'

export interface NotebookData {
  uuid: string
  title: string
  sections: SectionData[]
  //resources: {
  //  [uuid: string]: NotebookResource
  //}
}

export interface SectionData {
  uuid: string
  header: string
  blocks: BlockData[]
}

export type BlockData = TeXBlockData | ImgBlockData

export interface TeXBlockData {
  type: 'tex'
  uuid: string
  code: string
}

export interface ImgBlockData {
  type: 'img'
  uuid: string
  resource: NotebookResourceImg
}

export type NotebookResource = NotebookResourceImg

export interface NotebookResourceImg {
  type: 'img'
  width: number
  height: number
  src: string
}

export const emptyBlockData: () => BlockData
  = () => ({
    type: 'tex',
    uuid: v4(),
    code: ''
  })

export const emptyImgBlockData: () => BlockData
  = () => ({
    type: 'img',
    uuid: v4(),
    resource: {
      type: 'img',
      width: 700,
      height: 700,
      src: '',
    }
  })

export const emptySectionData: () => SectionData
  = () => ({
    uuid: v4(),
    header: 'New Section',
    blocks: [
      emptyBlockData()
    ]
  })

export const emptyNotebookData: () => NotebookData
  = () => ({
    uuid: v4(),
    title: 'New Notebook',
    sections: [
      emptySectionData()
    ],
    resources: {}
  })

const TeXBlockData: (obj: any) => TeXBlockData
  = (obj) => ({
    type: 'tex',
    uuid: obj.uuid ?? v4(),
    code: obj.code ?? '',
  })

const ImgBlockData: (obj: any) => ImgBlockData
  = (obj) => ({
    type: 'img',
    uuid: obj.uuid ?? v4(),
    resource: obj.resource ?? ''
  })

export const BlockData: (obj: any) => BlockData | null
  = (obj) =>{
    if (typeof(obj) === 'object'){
      switch(obj.type) {
        case 'img':
          return ImgBlockData(obj)
        case 'tex':
        default:
          return TeXBlockData(obj)
      }
    }
    return null
  }

export const SectionData: (obj: any) => SectionData | null
  = (obj) => typeof(obj) === 'object' ?
    {
      uuid: obj.uuid ?? v4(),
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
      uuid: obj.uuid ?? v4(),
      title: obj.title ?? '',
      sections: Array.isArray(obj.sections) ?
        (obj.sections as Array<any>)
          .map((section) => SectionData(section))
          .filter((section) => section !== null) as SectionData[] :
          [],
      resources: typeof(obj.resources) === 'object' ?
        obj.resources :
        {}
    } : null

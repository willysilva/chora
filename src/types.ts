export interface IExpert {
    name: string
    handle(input: string): string
  }
  
  export interface IExpertise {
    name: string
    experts: IExpert[]
    isReady(input: string): boolean
  }
  

  export interface IExpertiseSupervisor {
    name: string
    pickExpertise(input: string, allExpertises: IExpertise[]): IExpertise | null
  }
  

  export interface ChoraOptions {
    experts?: IExpert[]
    expertises?: IExpertise[]
    supervisor?: IExpertiseSupervisor
  }
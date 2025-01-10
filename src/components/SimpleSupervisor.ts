import { IExpertiseSupervisor, IExpertise } from '../types'

export class SimpleSupervisor implements IExpertiseSupervisor {
  public name: string

  constructor(name: string) {
    this.name = name
  }

 
  public pickExpertise(input: string, allExpertises: IExpertise[]): IExpertise | null {
    for (const expertise of allExpertises) {
      if (expertise.isReady(input)) {
        return expertise
      }
    }
    return null
  }
}
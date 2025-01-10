// src/Chora.ts
import { ChoraOptions, IExpert, IExpertise } from './types'

export class Chora {
  private experts: IExpert[]       
  private expertises: IExpertise[] 
  private supervisor?: ChoraOptions['supervisor']

  constructor(options: ChoraOptions) {
    this.experts = options.experts ?? []
    this.expertises = options.expertises ?? []
    this.supervisor = options.supervisor
  }


  public processUserInput(input: string): string {
    if (this.supervisor) {
      const chosenExpertise = this.supervisor.pickExpertise(input, this.expertises)
      if (!chosenExpertise) {
        return `No expertise found for input: "${input}"`
      }
      const chosenExpert = this.pickExpert(chosenExpertise)
      if (!chosenExpert) {
        return `No experts in expertise "${chosenExpertise.name}" for "${input}"`
      }
      return chosenExpert.handle(input)
    }

    if (this.experts.length === 0) {
      return 'No experts are available to handle your input.'
    }

    const expert = this.experts[0]
    return expert.handle(input)
  }


  private pickExpert(expertise: IExpertise): IExpert | undefined {
    return expertise.experts[0]
  }
}
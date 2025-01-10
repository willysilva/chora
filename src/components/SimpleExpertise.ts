import { IExpertise, IExpert } from '../types'

export class SimpleExpertise implements IExpertise {
  public name: string
  public experts: IExpert[]

  constructor(name: string, experts: IExpert[]) {
    this.name = name
    this.experts = experts
  }

  public isReady(input: string): boolean {
    return input.trim().length >= 5
  }
}
import { IExpert } from '../types'

export class SimpleExpert implements IExpert {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public handle(input: string): string {
    return `[Expert ${this.name}] handling: "${input}"`
  }
}
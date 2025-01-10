
Chora is a flexible architecture for orchestrating chat flows or task execution. It allows you to configure:
	•	Experts — Individual handlers with domain-specific logic.
	•	Expertises — Collections of experts, along with readiness checks or constraints.
	•	Supervisor — A decision-maker that chooses which expertise should handle a given user input.
	•	Orchestrator — The main interface that processes user input, coordinating experts, expertises, and the supervisor.

Features
	•	Modular: You can swap out or add experts, expertises, or supervisors without changing the core orchestrator.
	•	TypeScript Support: Written in TypeScript for type-safe development.
	•	Extensible: Add custom logic for choosing experts, validating input, etc.

Installation

npm install chora
or
yarn add chora

(Adjust package name if you publish under a different name.)

Basic Usage

Below is a minimal example showing how to set up Chora with one or more experts, an expertise, and a supervisor.

import {
  Chora,
  SimpleExpert,
  SimpleExpertise,
  SimpleSupervisor
} from 'chora'

// 1) Define your experts
const mathExpert = new SimpleExpert('MathGuru')
const chatExpert = new SimpleExpert('ChatWizard')

// 2) Group experts into expertises
//    Each expertise can check if it's "ready" to handle the input.
const mathExpertise = new SimpleExpertise('MathDomain', [mathExpert])
const chatExpertise = new SimpleExpertise('ChatDomain', [chatExpert])

// 3) Create a supervisor that picks which expertise to use
//    based on the user input (e.g., first domain that says "I'm ready")
const supervisor = new SimpleSupervisor('MainSupervisor')

// 4) Pass these into Chora
const chora = new Chora({
  expertises: [mathExpertise, chatExpertise],
  supervisor
})

// 5) Process user input
const result = chora.processUserInput('Hello, please help me with 2+2')
console.log(result)
// => [Expert MathGuru] handling: "Hello, please help me with 2+2"

Without a Supervisor

If you’d rather not use a supervisor, you can omit expertises and only provide a direct list of experts. In that case, Chora will pick from the experts array.

import { Chora, SimpleExpert } from 'chora'

const chatExpert = new SimpleExpert('ChatWizard')
const mathExpert = new SimpleExpert('MathGuru')

const choraNoSupervisor = new Chora({
  experts: [chatExpert, mathExpert] // No supervisor & no expertises
})

console.log(choraNoSupervisor.processUserInput('I need chat assistance.'))
// => [Expert ChatWizard] handling: "I need chat assistance."

Project Structure

A typical project using Chora might look like this:

my-app/
├─ src/
│  └─ ...
├─ package.json
├─ tsconfig.json
└─ ...


Scripts

	
All contributions are welcome!

License

MIT

Enjoy orchestrating your chat and task flows with Chora! If you have questions or suggestions, feel free to open an issue or PR.

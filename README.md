
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
# or
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

If you’re developing Chora itself, a simplified structure is:

chora/
├─ src/
│  ├─ components/
│  │  ├─ SimpleExpert.ts
│  │  ├─ SimpleExpertise.ts
│  │  └─ SimpleSupervisor.ts
│  ├─ Chora.ts
│  ├─ index.ts
│  └─ types.ts
├─ tests/
│  └─ ...
├─ package.json
├─ tsconfig.json
├─ README.md
└─ ...

Scripts

If you’re developing Chora itself, you might have scripts like:

{
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint . --ext .ts --max-warnings=0",
    "prepare": "npm run build"
  }
}

	•	build: Compiles TypeScript into JavaScript.
	•	test: Runs your test suite (using Jest or another framework).
	•	lint: Ensures consistent code style.
	•	prepare: Automatically builds before publishing to npm.

Advanced Usage
	•	Custom Expert Selection
You can create your own function to choose an expert (e.g., pick the one with the best “confidence score”).
	•	Multiple Supervisors
You can have layered supervisors that handle different aspects of domain selection, or fallback logic if the first supervisor doesn’t find a match.
	•	Checklists / Pre-Processors
Insert additional checks before choosing an expertise (e.g., user authentication, data validation).
	•	Plugins & Extensions
Add specialized experts (e.g., DatabaseExpert, OpenAIExpert) that do external API calls or advanced computations.

Contributing
	1.	Fork this repo and clone it locally.
	2.	Create a feature branch for your changes.
	3.	Commit your work (git commit -m "Add new feature").
	4.	Open a Pull Request (PR) on the main repo.

All contributions are welcome!

License

MIT

Enjoy orchestrating your chat and task flows with Chora! If you have questions or suggestions, feel free to open an issue or PR.
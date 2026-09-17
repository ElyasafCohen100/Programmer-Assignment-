# AI Usage

## Did You Use AI?

Yes.

## Tools Used

- ChatGPT

## Where AI Helped

I used ChatGPT mainly as a learning, debugging, review, and design assistant throughout the assignment.

AI helped me with:
- Understanding the existing frontend, backend, Solidity, and Web3 flow in the "Save the Lab" task.
- Learning the blockchain/Web3 architecture, which was new to me, including MetaMask, ethers, ABI, smart contracts, Solidity, blockchain, and their relationship with the frontend and backend.
- Discussing possible causes of bugs and reviewing whether the fixes I implemented addressed the original problems.
- Understanding unfamiliar TypeScript, React, Redux, and Web3 concepts before implementing changes myself.
- Discussing the structure and state flow of the React/Redux chat UI, including message states, failure simulation, and auto-scroll behavior.
- Reviewing and testing the implementation with me after I wrote the code.
- Suggesting UI/design ideas and helping with layout, spacing, sizing, and other presentation decisions.
- Git and submission workflow questions.
- Understanding the architecture requirements for the frontal assignment and discussing possible architecture decisions.
- Generating draft PowerPoint diagrams/slides based on architecture decisions that I reviewed and understood.

## Prompts Or Questions Asked

Examples of questions I asked:

### Assignment and Debugging
- What exactly is required in each part of the assignment?
- Can you help me understand the existing project flow before I start looking for bugs?
- Does this bug fix solve the original problem, and how can I verify it?

### Blockchain / Web3
- What is a smart contract and what role does Solidity have in this project?
- What are MetaMask, ethers, and an ABI, and how do they work together?
- What is the difference between blockchain storage and a regular database?
- What is the difference between reading from a smart contract and sending a transaction?

- How do the frontend, MetaMask, ethers, ABI, Solidity contract, blockchain, and backend connect together?


### React / Redux / Chat UI
- How should Redux state and actions be structured for a small chat application?

- How can I implement auto-scroll when a new message is added?
- How should a chat recover after a refresh or temporary disconnection?

### Architecture
- How should an anonymous participant/session be identified securely?
- What is the difference between authentication and authorization?
- How can WebSocket messages be routed to the correct anonymous experiment session?
- What should happen when the participant is offline or reconnects?
- How can WebSocket routing work across multiple server instances?
- What role can a shared Pub/Sub layer such as Redis play when scaling WebSocket servers?

## What You Personally Verified

I personally reviewed and understood the final changes before submitting them.

My general workflow was to first understand the problem and relevant concepts with ChatGPT, then write or modify the code myself based on that understanding, and finally review and test the result.

I personally:
- Read the assignment requirements and relevant source files.
- Traced the existing frontend, backend, Solidity, and Web3 flow.
- Learned and understood the Web3/blockchain flow before modifying unfamiliar parts of the project.
- Identified and implemented the bug fixes after discussing the underlying problems.
- Used ChatGPT to review my reasoning and verify that my fixes addressed the original bugs.
- Wrote the chat UI implementation after discussing the required behavior and React/Redux concepts.
- Adjusted implementations when testing showed that a proposed approach did not work correctly.
- Verified the TypeScript changes and ran the TypeScript checks successfully.
- Ran the production build and ESLint successfully.
- Manually tested conversation selection, message sending, sending/sent/failed states, online/offline behavior, empty conversations, scrolling, and auto-scroll.
- Reviewed my Git changes and pushed the work to my candidate branch.
- Made sure I could explain the reasoning behind the final implementation and architecture decisions.

## Anything AI Suggested That You Rejected

I did not automatically use every suggestion from ChatGPT. I evaluated suggestions against the existing code and the assignment requirements and changed or rejected approaches when they did not fit.

For example, during the chat UI implementation I tried an alternative auto-scroll approach suggested during our discussion. It interfered with the existing scroll container and caused messages to be hidden, so after testing it I rejected that approach and returned to the simpler end-of-message-list marker solution.

I also preferred to keep the implementation and architecture relatively simple rather than adding additional abstractions or features that were not required by the assignment.

# Mini Task Manager

#### **A monorepo for web-app and api for Mini Task Manager**

### Quick Run (Development mode)

#### The project depends on node (v22.17.0 LTS or later). The project is not dockerized. So, for now, check if a lower version is installed globally and update the version.

#### _Run the following commands after cloning the project in root of the project:_

#### npm install

#### npm run dev

### Quick Run (Production mode)

#### _Run the following commands after cloning the project in root of the project:_

#### npm install

#### npm run build

#### npm run start

### Other commands

#### _Run the following command for running unit tests for api:_

#### npm run test

#### _Run the following command for linting frontend codebase:_

#### npm run lint

### Implementation libraries

- Frontend: React, Material UI, Zustand
- Backend: Express, Sqlite (in-memory based), Jest
- Linters: Eslint

### Features implemented as per requirements

✅ PRD01: Task Submission

✅ PRD02: Task List

✅ PRD03: Assign Task

✅ PRD04: Task Status Update (Optional)

### Assumptions / Implementation Notes

- Node version >= v22.17.0
- In-memory use of sqlite (Data only persists until server is running or no code is updated)

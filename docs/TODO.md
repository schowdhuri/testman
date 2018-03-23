# Roadmap to 1.0

## Core Features

- Defect-TestRun relation
    - linking/unlinking defect -> testrun [DONE]

- Attachments
    - Defect [DONE]
    - TestCase [DONE]
    - Defect-Comment [DONE]
    - TestCase-Comment [DONE]
    - Cron script to cleanup orphaned attachments
    - Delete file from fs when File is deleted [DONE]
    - Add attachments when creating Defect
    - Add attachments when creating TestCase
- CSV upload for test cases [DONE]
- Clone Exec Cycle
    - All tests
    - Only failed tests
- Users
    - OAuth [DONE]
    - User-Comment, User-Defect, User-TestCase, User-TestRun
    - User Roles
- Dashboard
- Integrations (Slack, email, ...)


## Enhancements

- CSS fix for sidebar links [DONE]
- Markdown support [DONE]
- Deep-linking + routing for TestDesign tab
- Auto-select first item when TestDesign or ExecCycle is opened


## Workflow/Build Process

- Hot reload
- ESLint [DONE]
- Prettier (?)

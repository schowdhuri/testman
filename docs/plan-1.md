# Sections
1. Docs
1. Test Plan
1. Execution Cycle

# Entities
1. TestCase
	- id
	- name
	- dependencies: [ TestCase ]
	- description: RichText
	- status: New|Fail|Pass
	- created_by: User
	- comments: [ Comment ]

1. RichText
	- type: markdown|jade
	- content: String
	- attachment: [ Attachment ]

1. Severity: Low|Medium|High

1. Comment
	- content: RichText
	- attachment: [ Attachment ]

1. Attachment
	- url

1. Defect
	- test_case: TestCase
	- created_by: User
	- assigned_to: User
	- status: Open|WIP|Fixed|Closed
	- severity: Severity
	- description: RichText
	- comments: [ Comment ]

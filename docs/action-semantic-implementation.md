# Action-Family Semantic Token Implementation (Link, Pagination, Chip, Card)
Action is for interactive elements where the user's intent is to move forward, navigate, submit, or commit something in the flow.

The guiding question: "Does clicking this take the user somewhere else, or make something happen elsewhere in the system?"

Examples of Action use
CdrButton — submit a form, confirm a choice, add to cart, delete
CdrLink — navigate to another page or section
CdrCard — an interactive container that links to a single subject or destination
CdrPagination — navigate to another page of results
CdrBreadcrumb — navigate back/up the site hierarchy



## Per-Component Notes

### CdrLink (`src/components/link/CdrLink.tokens.ts`)

- See the figma mappings https://www.figma.com/design/7Cuo6NPfzPwNfGoht4WkFp/Semantics---Color?node-id=309-2&p=f&m=dev

### CdrChip (`src/components/chip/CdrChip.tokens.ts`)

- We are moving these to the selection family rather than action as chips are intended for filtering content not naviagation 

### CdrCard (`src/components/card/CdrCard.tokens.ts`)

- this is a gap in the design doc and should be covered by action and universal 

## Missing from design mapping 

- cdrBreadcrumb 
- cdrCard - partial 



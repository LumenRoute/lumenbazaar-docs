# Wave Operations Ledger

Status: inactive. Do not enter contributors, assignments, points, or outcomes
until a repository is approved and its curated issues are deliberately added to
an active Stellar Wave.

This ledger is the operational record for an approved repository. GitHub and
the Drips dashboard remain the authoritative sources for issue, pull-request,
assignment, review, and program state.

## Activation Record

| Field | Value |
| --- | --- |
| Repository | Not activated |
| Program and Wave | Not activated |
| Approval reference | Not available |
| UTC start and deadline | Not available |
| Accountable maintainer | Not confirmed |
| Backup maintainer | Not confirmed |
| Daily review windows | Not committed |
| Repository points budget | Confirm in authenticated dashboard |
| Organization points budget | Confirm in authenticated dashboard |

Activation requires a public repository approval and a named Wave. Never
populate this table from an application, assumption, GitHub complexity label,
or prior Wave configuration.

## Issue Ledger

Add one row per issue only after it is accepted into the program.

| Issue | Complexity | Points | Applicant or assignee | Pull request | CI | Maintainer review | Contributor review | State | Blocker and next action | Last checked UTC |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| None active | - | - | - | - | - | - | - | Inactive | Repository approval required | - |

Allowed states are `nominated`, `applications-open`, `assigned`, `in-progress`,
`review`, `resolved`, `rejected`, `removed`, and `rollover`. Record a link for
every assignment, pull request, CI result, resolution, rejection, or removal;
do not reduce a disputed or unknown outcome to a bare status word.

## Daily Operating Cycle

1. Compare the dashboard and GitHub state for every nominated issue.
2. Review new applications for demonstrated fit, conflicts, prior work, and
   suspicious account relationships before assigning one contributor.
3. Respond to contributor questions and record blockers without expanding the
   issue beyond its accepted scope.
4. Inspect linked pull requests for the closing reference, focused diff,
   required tests, security evidence, generated artifacts, and current CI.
5. Update points only through the authenticated Drips controls and keep the
   pre-multiplier repository and organization totals within their current
   budgets.
6. Record the UTC check time, reviewer, state, and next action in the ledger.

## Resolution Gate

Mark an issue resolved only when all of these statements are true:

- the assigned contributor's pull request satisfies every issue acceptance
  criterion without unrelated scope substitution;
- required local checks and protected CI pass on the exact merged revision;
- security-sensitive behavior has direct tests and no waived failing evidence;
- documentation and generated artifacts match the implemented interface;
- the pull request is independently reviewed and merged through branch
  protection with its closing reference intact;
- the Drips issue status and points match the defensible merged outcome; and
- maintainer and contributor two-way reviews are completed within the current
  program deadline.

## Integrity Review

Escalate instead of assigning or resolving when evidence suggests:

- one person controlling multiple applicant or reviewer accounts;
- coordinated applications intended to reserve issues without credible work;
- account sharing, identity sharing, or pressure to expose KYC information;
- maintainer self-dealing, undisclosed conflicts, or reciprocal low-scrutiny
  approvals;
- low-effort generated changes that do not meet acceptance criteria;
- replacement of the accepted scope with easier or unrelated work;
- bypassed tests, fabricated output, copied evidence, or an unsafe rushed
  merge; or
- private settlement, payment, or reward arrangements outside the program
  record.

Record only the minimum public facts needed for a fair decision. Do not publish
private identity material or unverified accusations.

## Deadline And Rollover

Before the active Wave deadline, classify every unresolved issue:

| Outcome | Required action |
| --- | --- |
| Valid completed work | Verify the resolution gate, merge, resolve, and record reviews. |
| Viable but unfinished work | Record the blocker and explicitly retain or roll over only if the scope remains valuable and the contributor state is accurate. |
| Stale or no longer valuable | Remove it from the program so it does not consume a later budget. |
| Unsafe, substituted, or non-compliant work | Reject the outcome with objective acceptance-criteria evidence; do not merge to meet a deadline. |
| Disputed decision | Preserve links and timestamps, communicate on GitHub, and use the current Drips support process when necessary. |

At Wave close, reconcile dashboard points, repository issues, merged commits,
CI, reviews, and this ledger. The final record must not claim points or merged
evidence that cannot be independently traced.

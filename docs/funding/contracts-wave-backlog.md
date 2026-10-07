# Contracts Wave Backlog

This record captures the Phase 37 triage decision for the first contracts
repository Wave backlog. It is a preparation artifact, not evidence that the
repository or any issue has been approved by Drips.

## Triage Decision

Every open contracts issue was reviewed on October 7, 2026 and assigned to one
of these groups:

| Group | Issues | Decision |
| --- | --- | --- |
| Readiness work present in the protected pull request | [#1](https://github.com/LumenRoute/lumenbazaar-contracts/issues/1)-[#7](https://github.com/LumenRoute/lumenbazaar-contracts/issues/7) | Removed from the Wave candidate set. Keep open as `readiness-remediation` until the implementing pull request merges. |
| First Wave candidates | [#8](https://github.com/LumenRoute/lumenbazaar-contracts/issues/8), [#14](https://github.com/LumenRoute/lumenbazaar-contracts/issues/14), [#17](https://github.com/LumenRoute/lumenbazaar-contracts/issues/17), [#18](https://github.com/LumenRoute/lumenbazaar-contracts/issues/18) | Retain `wave-ready`; do not nominate before repository approval. |
| Meaningful later roadmap | [#9](https://github.com/LumenRoute/lumenbazaar-contracts/issues/9)-[#13](https://github.com/LumenRoute/lumenbazaar-contracts/issues/13), [#15](https://github.com/LumenRoute/lumenbazaar-contracts/issues/15), [#16](https://github.com/LumenRoute/lumenbazaar-contracts/issues/16), [#19](https://github.com/LumenRoute/lumenbazaar-contracts/issues/19), [#20](https://github.com/LumenRoute/lumenbazaar-contracts/issues/20) | Keep as `roadmap`; these are not part of the first application set. |
| Phase tracker | [#31](https://github.com/LumenRoute/lumenbazaar-contracts/issues/31) | Keep open until the application is submitted or its external blocker is recorded. |

`needs-triage` was removed only after these decisions. The selected issues are
not assigned, added to a Drips program, or given dashboard points by this
record.

## Selected Issues

| Issue | Bounded outcome | Objective verification | Complexity |
| --- | --- | --- | --- |
| [#8: Verify published transactions against Horizon in scheduled CI](https://github.com/LumenRoute/lumenbazaar-contracts/issues/8) | One scheduled, secret-free evidence verifier; pull-request CI remains independent of testnet availability. | Resolve every committed transaction and distinguish evidence mismatch from network outage. | Medium |
| [#14: Make generated specs deterministic on Windows and Ubuntu](https://github.com/LumenRoute/lumenbazaar-contracts/issues/14) | One cross-platform generation gate without suppressing semantic differences. | Clean Windows and Ubuntu runs produce no diff, while an intentional interface change fails the gate. | Medium |
| [#17: Add mutation tests for authorization and cap checks](https://github.com/LumenRoute/lumenbazaar-contracts/issues/17) | One bounded mutation suite over security-critical source only. | Removed authorization and inverted cap, expiry, or final-state checks are detected within a documented runtime budget. | High |
| [#18: Enforce resource budget regression thresholds](https://github.com/LumenRoute/lumenbazaar-contracts/issues/18) | One versioned budget gate for public contract operations. | Worst-case valid inputs are measured and reviewed thresholds distinguish code regression from toolchain drift. | Medium |

Each issue supplies public context, in-scope and out-of-scope boundaries,
relevant files, acceptance criteria, required repository checks, security
constraints, and pull-request completion requirements. Each can be completed
by one contributor in one focused pull request without depending on another
selected issue.

## Budget And Review Gate

The proposed mix is three Medium issues and one High issue. This document does
not convert those labels into points: the maintainer must use the current
Drips dashboard values after repository approval, then confirm the total fits
the active Wave budget before nomination.

The required unfamiliar-reviewer estimate is still pending. It must verify that
each issue is understandable without private context, independently scoped,
valuable, and feasible within one Wave. A maintainer must record that review in
the application evidence before Phase 37 can be treated as fully complete.

## Stop Conditions

- Do not add any selected issue to a program before repository approval.
- Do not substitute a readiness prerequisite or already implemented task.
- Do not assign points from GitHub complexity labels.
- Do not weaken contract authorization, settlement, expiry, or resource checks
  to make an issue easier to complete.

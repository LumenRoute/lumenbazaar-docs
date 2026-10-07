# Repository Governance

Changes to `main` use a pull request with the `docs` CI job, one approving review, resolved
conversations, and code-owner review for owned paths. Stale approvals are dismissed when the head
changes. Administrators follow the same rule during ordinary work.

Releases use annotated or signed tags and a GitHub release that records the source commit, generated
artifact manifest checksum, public URL, content checks, dependency policy result, and changelog. A
public URL whose source commit is unknown is not current release evidence.

An emergency exception is limited to an actively harmful security instruction or materially false
deployment/payment claim. The maintainer records the reason and UTC time, uses the smallest change,
runs all feasible checks, restores protection immediately, and opens a retrospective pull request
within one business day. Generated evidence is never edited to conceal source drift.

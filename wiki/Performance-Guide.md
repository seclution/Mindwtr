# Performance Guide

This page tracks performance-focused references for Mindwtr.

## High-impact areas

- Large list filtering and sorting
- Project/task ordering updates
- Sync merge and attachment reconciliation

## Practical guidance

1. Prefer narrow store selectors to reduce unnecessary re-renders.
2. Keep expensive derivations memoized.
3. Use virtualization for large task lists.
4. Validate sync payloads and avoid broad retries on malformed data.

## Related docs

- [[Architecture]]
- [[Core API]]
- [[Data and Sync]]
- [[Diagnostics and Logs]]

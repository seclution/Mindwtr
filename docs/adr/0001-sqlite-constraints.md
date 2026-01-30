# ADR 0001: SQLite constraints and sync soft-deletes

Date: 2026-01-30
Status: Accepted

## Context

Mindwtr is offline-first and uses soft-delete tombstones so that deletions can be synced safely across devices. The local SQLite schema has relationships between tasks, projects, sections, and areas. Enabling strict foreign key constraints would automatically cascade deletes, which can conflict with tombstone-based sync merges and lead to accidental data loss.

## Decision

We keep SQLite foreign key constraints **off** and enforce relationships explicitly in the application layer. This keeps tombstones intact and ensures that sync merges can reason about deletes without the database automatically removing related records.

## Consequences

- We must handle cascades (e.g., deleting a project) in application logic.
- Sync merges remain predictable and preserve deletion history.
- Data validation needs to happen in the core store and import paths.

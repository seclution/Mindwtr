# Sync Algorithm

Mindwtr uses local-first synchronization with deterministic conflict handling.

## Core rules

1. Per-entity merge with revision-aware, last-write-wins behavior.
2. Soft deletes use tombstones (`deletedAt`) to avoid cross-device resurrection.
3. Clock skew is measured and surfaced in diagnostics.
4. Attachment metadata merges first, then attachment file reconciliation runs.

## Related docs

- [[Data and Sync]]
- [[Cloud Sync]]
- [[Diagnostics and Logs]]
- [[Core API]]

## Troubleshooting

If you see repeated conflicts or skew warnings:

1. Verify device clocks (automatic network time enabled).
2. Check sync backend connectivity/auth.
3. Inspect sync diagnostics in app settings and logs.

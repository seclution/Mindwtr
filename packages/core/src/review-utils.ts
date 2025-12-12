import { safeParseDate } from './date';

/**
 * Returns true if an item is due for review.
 * If reviewAt is not set or invalid, treat as due.
 */
export function isDueForReview(reviewAt: string | undefined, now: Date = new Date()): boolean {
    const date = safeParseDate(reviewAt);
    if (!date) return true;
    return date.getTime() <= now.getTime();
}

/**
 * Filter items that are due for review.
 */
export function filterDueForReview<T extends { reviewAt?: string }>(
    items: T[],
    now: Date = new Date()
): T[] {
    return items.filter((item) => isDueForReview(item.reviewAt, now));
}


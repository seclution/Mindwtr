import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { TaskItem } from '../components/TaskItem';
import { Task } from '@mindwtr/core';
import { LanguageProvider } from '../contexts/language-context';

// Mock store
vi.mock('@mindwtr/core', async () => {
    const actual = await vi.importActual<typeof import('@mindwtr/core')>('@mindwtr/core');
    return {
        ...actual,
        useTaskStore: () => ({
            projects: [],
            tasks: [],
            updateTask: vi.fn(),
            deleteTask: vi.fn(),
            moveTask: vi.fn(),
        }),
    };
});

const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    status: 'inbox',
    tags: [],
    contexts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

describe('Accessibility', () => {
    it('TaskItem should have no violations', async () => {
        const { container } = render(
            <LanguageProvider>
                <TaskItem task={mockTask} />
            </LanguageProvider>
        );
        const results = await axe(container);
        // @ts-expect-error - vitest-axe types not picked up by tsc
        expect(results).toHaveNoViolations();
    });
});

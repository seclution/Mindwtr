import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { TaskItem } from '../components/TaskItem';
import { Task } from '@mindwtr/core';
import { LanguageProvider } from '../contexts/language-context';
import { useUiStore } from '../store/ui-store';

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
        useUiStore.setState({ editingTaskId: null });
        const { container } = render(
            <LanguageProvider>
                <TaskItem task={mockTask} />
            </LanguageProvider>
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});

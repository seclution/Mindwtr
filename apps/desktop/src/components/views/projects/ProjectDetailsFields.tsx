import type { Project } from '@mindwtr/core';
import { TaskInput } from '../../Task/TaskInput';

type ProjectDetailsFieldsProps = {
    project: Project;
    selectedAreaId: string;
    sortedAreas: { id: string; name: string }[];
    noAreaId: string;
    t: (key: string) => string;
    tagDraft: string;
    onTagDraftChange: (value: string) => void;
    onCommitTags: () => void;
    onNewArea: () => void;
    onManageAreas: () => void;
    onAreaChange: (value: string) => void;
    reviewAtValue: string;
    onReviewAtChange: (value: string) => void;
    projectTaskTitle: string;
    onProjectTaskTitleChange: (value: string) => void;
    onSubmitProjectTask: (value: string) => Promise<void> | void;
    projects: Project[];
    contexts: string[];
    onCreateProject: (title: string) => Promise<string>;
};

export function ProjectDetailsFields({
    project,
    selectedAreaId,
    sortedAreas,
    noAreaId,
    t,
    tagDraft,
    onTagDraftChange,
    onCommitTags,
    onNewArea,
    onManageAreas,
    onAreaChange,
    reviewAtValue,
    onReviewAtChange,
    projectTaskTitle,
    onProjectTaskTitleChange,
    onSubmitProjectTask,
    projects,
    contexts,
    onCreateProject,
}: ProjectDetailsFieldsProps) {
    return (
        <>
            <div className="mb-6 bg-card border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {t('projects.areaLabel')}
                    </label>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onNewArea}
                            className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                        >
                            + New
                        </button>
                        <button
                            type="button"
                            onClick={onManageAreas}
                            className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Manage Areas
                        </button>
                    </div>
                </div>
                <select
                    key={`${project.id}-area`}
                    value={selectedAreaId}
                    onChange={(e) => onAreaChange(e.target.value)}
                    className="w-full text-sm bg-muted/50 border border-border rounded px-2 py-1"
                >
                    <option value={noAreaId}>{t('projects.noArea')}</option>
                    {sortedAreas.map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6 bg-card border border-border rounded-lg p-3 space-y-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t('taskEdit.tagsLabel')}
                </label>
                <input
                    key={`${project.id}-tags`}
                    type="text"
                    value={tagDraft}
                    onChange={(e) => onTagDraftChange(e.target.value)}
                    onBlur={onCommitTags}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onCommitTags();
                            e.currentTarget.blur();
                        }
                    }}
                    placeholder="#feature, #client"
                    className="w-full text-sm bg-muted/50 border border-border rounded px-2 py-1"
                />
            </div>

            <div className="mb-6 bg-card border border-border rounded-lg p-3 space-y-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t('projects.reviewAt')}
                </label>
                <input
                    key={`${project.id}-review`}
                    type="datetime-local"
                    defaultValue={reviewAtValue}
                    onBlur={(e) => onReviewAtChange(e.target.value)}
                    className="w-full text-sm bg-muted/50 border border-border rounded px-2 py-1"
                />
                <p className="text-xs text-muted-foreground">
                    {t('projects.reviewAtHint')}
                </p>
            </div>

            <div className="mb-6">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!projectTaskTitle.trim()) return;
                        await onSubmitProjectTask(projectTaskTitle);
                    }}
                    className="flex gap-2"
                >
                    <TaskInput
                        value={projectTaskTitle}
                        projects={projects}
                        contexts={contexts}
                        onCreateProject={onCreateProject}
                        onChange={(next) => onProjectTaskTitleChange(next)}
                        placeholder={t('projects.addTaskPlaceholder')}
                        className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        {t('projects.addTask')}
                    </button>
                </form>
            </div>
        </>
    );
}

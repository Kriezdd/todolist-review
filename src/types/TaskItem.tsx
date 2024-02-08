export type TaskItem = {
    id: string;
    name: string;
    description?: string;
    deadline: string;
    tags: string[];
    status: 'inProgress' | 'done';
}
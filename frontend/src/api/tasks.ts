import type { Task, TaskRequest } from '../types/task';

const BASE = '/api/tasks';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const tasksApi = {
  getAll: (): Promise<Task[]> =>
    fetch(BASE).then(r => handleResponse<Task[]>(r)),

  getById: (id: number): Promise<Task> =>
    fetch(`${BASE}/${id}`).then(r => handleResponse<Task>(r)),

  create: (data: TaskRequest): Promise<Task> =>
    fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => handleResponse<Task>(r)),

  update: (id: number, data: TaskRequest): Promise<Task> =>
    fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => handleResponse<Task>(r)),

  delete: (id: number): Promise<void> =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(r => handleResponse<void>(r)),
};

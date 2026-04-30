import type { Task, TaskRequest } from '../types/task';

const BASE = '/api/tasks';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (body.error) throw new Error(body.error);
    // Backend validation returns a field → message map
    const fieldErrors = Object.entries(body as Record<string, string>);
    if (fieldErrors.length > 0) {
      throw new Error(fieldErrors.map(([f, m]) => `${f}: ${m}`).join(', '));
    }
    throw new Error(`Request failed: ${res.status}`);
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

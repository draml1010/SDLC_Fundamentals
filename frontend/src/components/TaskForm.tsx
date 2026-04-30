import { useState, useEffect } from 'react';
import type { Task, TaskRequest, TaskStatus } from '../types/task';

interface Props {
  initial?: Task;
  onSubmit: (data: TaskRequest) => Promise<void>;
  onCancel: () => void;
}

const emptyForm: TaskRequest = { title: '', description: '', status: 'TODO', dueDate: '' };

export function TaskForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TaskRequest>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof TaskRequest, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description ?? '',
        status: initial.status,
        dueDate: initial.dueDate ?? '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setSubmitError(null);
  }, [initial]);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.length > 100) e.title = 'Max 100 characters';
    if (form.description && form.description.length > 500) e.description = 'Max 500 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit({
        ...form,
        description: form.description || undefined,
        dueDate: form.dueDate || undefined,
      });
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          maxLength={100}
          placeholder="Task title"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
          rows={3}
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          maxLength={500}
          placeholder="Optional description"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.dueDate}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
          />
        </div>
      </div>

      {submitError && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">{submitError}</p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Saving…' : initial ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

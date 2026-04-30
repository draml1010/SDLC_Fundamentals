import { useEffect, useState } from 'react';
import { tasksApi } from './api/tasks';
import type { Task, TaskRequest } from './types/task';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { Modal } from './components/Modal';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | undefined>();

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    setLoading(true);
    setError(null);
    try {
      setTasks(await tasksApi.getAll());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(undefined);
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(undefined);
  }

  async function handleSubmit(data: TaskRequest) {
    if (editing) {
      const updated = await tasksApi.update(editing.id, data);
      setTasks(ts => ts.map(t => t.id === updated.id ? updated : t));
    } else {
      const created = await tasksApi.create(data);
      setTasks(ts => [...ts, created]);
    }
    closeModal();
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksApi.delete(id);
      setTasks(ts => ts.filter(t => t.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete task');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading && (
          <p className="text-center text-gray-400 py-16">Loading tasks…</p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4">
            {error}
            <button onClick={loadTasks} className="ml-3 underline text-sm">Retry</button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">No tasks yet</p>
            <p className="text-sm">Click <strong>New Task</strong> to get started.</p>
          </div>
        )}

        {!loading && tasks.length > 0 && (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <Modal title={editing ? 'Edit Task' : 'New Task'} onClose={closeModal}>
          <TaskForm initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

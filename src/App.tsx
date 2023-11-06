import { useEffect, useState } from 'react';

import AddTask from './components/AddTask';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Task from './components/Task';
import { TaskPropsWithoutOnDelete } from './vite-env';
import { TasksContext } from './contexts/tasksContext';

const initTasks: TaskPropsWithoutOnDelete[] = [
  {
    id: '01',
    title: 'Buy Milk',
    description: '3 bottles x 1L',
    status: 'Not Started',
  },
  {
    id: '02',
    title: 'Write a blog post',
    description: 'A blog post about how to use Tailwind CSS with React',
    status: 'In Progress',
  },
  {
    id: '03',
    title: 'Do the laundry',
    description: 'Wash the clothes and hang them to dry',
    status: 'Done',
  },
];

function App() {
  // try to get the tasks from the local storage
  const initTasksFromLocalStorage = localStorage.getItem('tasks-dh');

  const [tasksDB, setTasksDB] = useState(
    initTasksFromLocalStorage
      ? (JSON.parse(initTasksFromLocalStorage) as TaskPropsWithoutOnDelete[])
      : initTasks.sort((a, b) => a.status.localeCompare(b.status))
  );
  const [tasksUI, setTasksUI] = useState(
    initTasksFromLocalStorage
      ? (JSON.parse(initTasksFromLocalStorage) as TaskPropsWithoutOnDelete[])
      : initTasks.sort((a, b) => a.status.localeCompare(b.status))
  );

  const onDelete = (id: string) => {
    setTasksDB(tasksDB.filter((task) => task.id !== id));
  };

  useEffect(() => {
    // Update the UI tasks when the tasksDB changes
    setTasksUI(tasksDB);
    // Update the local storage when the tasksDB changes
    localStorage.setItem('tasks-dh', JSON.stringify(tasksDB));
  }, [tasksDB]);

  return (
    <div className='grid min-h-screen max-w-5xl mx-auto'>
      <TasksContext.Provider
        value={{ tasksDB, setTasksDB, tasksUI, setTasksUI }}>
        <main className='p-4'>
          <div className='flex flex-wrap gap-4 items-center justify-center sm:items-end sm:justify-between'>
            <h1 className='text-4xl font-bold basis-3/4 text-center sm:basis-auto sm:text-start'>
              Tasks ({tasksUI.length})
            </h1>
            <section className='flex gap-2'>
              <Sort />
              <Filter />
              <AddTask />
            </section>
          </div>
          <hr className='my-4' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {tasksUI.length > 0 ? (
              tasksUI.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onDelete={(id: string) => {
                    onDelete(id);
                  }}
                />
              ))
            ) : (
              <p className='text-xl text-center col-span-2 mt-6 text-slate-600'>
                No tasks found
              </p>
            )}
          </div>
        </main>
      </TasksContext.Provider>
    </div>
  );
}

export default App;

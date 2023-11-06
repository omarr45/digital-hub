import { useContext, useEffect, useState } from 'react';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '@radix-ui/themes';
import { TasksContext } from '../contexts/tasksContext';

const Filter = () => {
  const { setTasksUI, tasksDB } = useContext(TasksContext);
  const [filter, setFilter] = useState('None');

  useEffect(() => {
    const filteredTasks = [...tasksDB].filter((task) => {
      if (filter === 'None') {
        return true;
      }
      if (filter === 'Done') {
        return task.status === 'Done';
      }
      if (filter === 'In Progress') {
        return task.status === 'In Progress';
      }
      if (filter === 'Not Started') {
        return task.status === 'Not Started';
      }
      return true;
    });
    setTasksUI(filteredTasks);
  }, [filter]);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='flex items-center justify-center gap-1 text-slate-600 text-sm font-semibold py-1.5 px-3 rounded-md hover:bg-slate-600/10 focus:outline-none focus-visible:outline-slate-600'>
            Filter ({filter})
            <CaretDownIcon width={20} height={20} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => setFilter('Done')}>
            Done
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setFilter('In Progress')}>
            In Progress
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setFilter('Not Started')}>
            Not Started
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => setFilter('None')}>
            None
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default Filter;

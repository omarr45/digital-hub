import { useContext, useEffect, useState } from 'react';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '@radix-ui/themes';
import { TasksContext } from '../contexts/tasksContext';

const Sort = () => {
  const { tasksUI, setTasksUI } = useContext(TasksContext);
  const [sort, setSort] = useState('Status');

  useEffect(() => {
    const sortedTasks = [...tasksUI].sort((a, b) => {
      if (sort === 'Title') {
        return a.title.localeCompare(b.title);
      }
      if (sort === 'Description') {
        return a.description.localeCompare(b.description);
      }
      if (sort === 'Status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    setTasksUI(sortedTasks);
  }, [sort]);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='flex items-center justify-center gap-1 text-slate-600 text-sm font-semibold py-1.5 px-3 rounded-md hover:bg-slate-600/10 focus:outline-none focus-visible:outline-slate-600'>
            Sort ({sort})
            <CaretDownIcon width={20} height={20} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => setSort('Title')}>
            Title
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setSort('Description')}>
            Description
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setSort('Status')}>
            Status
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default Sort;

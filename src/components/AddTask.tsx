import { AlertDialog } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import TaskForm from './TaskForm';

const AddTask = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button
          aria-label='Add a new task'
          className='bg-emerald-600 text-slate-50 aspect-square p-2.5 rounded-md hover:bg-emerald-700 focus:outline-none focus-visible:outline-emerald-700'>
          <PlusIcon
            stroke='currentColor'
            strokeWidth={1}
            width={18}
            height={18}
          />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Add a new task</AlertDialog.Title>
        <hr className='my-4' />
        <TaskForm initData={null} />
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AddTask;

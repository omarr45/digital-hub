import { AlertDialog, Badge } from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { TaskProps, statusColorType } from '../vite-env';

import React from 'react';
import TaskForm from './TaskForm';

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  onDelete,
}: TaskProps) => {
  const statusColor: statusColorType = {
    'Not Started': 'yellow',
    'In Progress': 'blue',
    Done: 'green',
  };
  return (
    <div className='p-4 rounded-md shadow-md flex items-start justify-between border border-slate-100'>
      <div>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-slate-500'>{description}</p>
        <Badge radius='full' color={statusColor[status]} className='mt-2'>
          {status}
        </Badge>
      </div>
      <div className='flex gap-2'>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <button
              aria-label='Edit Task'
              className='p-2 rounded-md text-slate-600 hover:bg-slate-200 focus:outline-none focus-visible:outline-slate-300'>
              <Pencil1Icon
                stroke='currentColor'
                strokeWidth={0.2}
                width={20}
                height={20}
              />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Edit Task</AlertDialog.Title>
            <hr className='my-4' />
            <TaskForm
              initData={{
                id,
                title,
                description,
                status,
              }}
            />
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <button
              aria-label='Delete Task'
              className='bg-red-500 text-slate-50 p-2 rounded-md hover:bg-red-600 focus:outline-none focus-visible:outline-red-600'>
              <TrashIcon
                stroke='currentColor'
                strokeWidth={0.2}
                width={20}
                height={20}
              />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Delete Task</AlertDialog.Title>
            <AlertDialog.Description size='2'>
              Are you sure you want to delete this task?
            </AlertDialog.Description>
            <div className='flex gap-2 items-center justify-end'>
              <AlertDialog.Cancel>
                <button className='text-slate-600 text-sm font-semibold py-1.5 px-3 rounded-md hover:bg-slate-600/10 focus:outline-none  focus-visible:outline-slate-600'>
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <button
                  className='bg-red-500 text-slate-50 font-semibold text-sm py-1.5 px-3 rounded-md hover:bg-red-600 focus:outline-none focus-visible:outline-red-600'
                  onClick={() => onDelete(id)}>
                  Delete
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  );
};

export default Task;

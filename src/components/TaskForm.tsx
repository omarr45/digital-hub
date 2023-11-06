import * as Form from '@radix-ui/react-form';

import { FormProps, TaskStatus } from '../vite-env';
import React, { useState } from 'react';

import { AlertDialog } from '@radix-ui/themes';
import { TasksContext } from '../contexts/tasksContext';

const TaskForm: React.FC<FormProps> = ({ initData }: FormProps) => {
  const isAdding = initData === null;

  if (isAdding) {
    initData = {
      id: '',
      title: '',
      description: '',
      status: 'Not Started',
    };
  }

  const [title, setTitle] = useState(initData!.title || '');
  const [description, setDescription] = useState(initData!.description || '');
  const [status, setStatus] = useState(initData!.status || 'Not Started');

  // To be able to use the status values in the select element
  const statusValues: TaskStatus[] = ['Done', 'In Progress', 'Not Started'];

  const { tasksDB, setTasksDB } = React.useContext(TasksContext);

  const onSave = () => {
    const newTasks = tasksDB.map((task) => {
      if (task.id === initData!.id) {
        return {
          ...task,
          title,
          description,
          status,
        };
      }
      return task;
    });
    setTasksDB(newTasks);
  };

  const onAdd = () => {
    const newTask = {
      id: Math.random().toString(),
      title,
      description,
      status,
    };
    setTasksDB([...tasksDB, newTask]);
  };

  return (
    <Form.Root className='space-y-3 mb-2'>
      <Form.Field name='title'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='font-semibold'>Title</Form.Label>
          <Form.Message match='valueMissing' className='text-red-500'>
            Please provide a title
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className='w-full p-2 rounded-md border border-slate-100 mt-1'
            placeholder='Task 01'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name='description'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='font-semibold'>Description</Form.Label>
          <Form.Message match='valueMissing' className='text-red-500'>
            Please provide a description
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className='w-full p-2 rounded-md border border-slate-100 mt-1'
            placeholder='This is the description for task 01.'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name='status'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='font-semibold'>Status</Form.Label>
          <Form.Message match='valueMissing' className='text-red-500'>
            Please select a status
          </Form.Message>
        </div>
        <Form.Control asChild>
          <select
            className='w-full p-2 rounded-md border border-slate-100 mt-1'
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            {statusValues.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Form.Control>
      </Form.Field>
      <div className='flex gap-2 items-center justify-end'>
        <AlertDialog.Cancel>
          <button className='text-slate-600 text-sm font-semibold py-1.5 px-3 rounded-md hover:bg-slate-600/10 focus:outline-none focus-visible:outline-slate-600'>
            Cancel
          </button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <button
            className='bg-emerald-600 text-slate-50 font-semibold text-sm py-1.5 px-3 rounded-md hover:bg-emerald-700 focus:outline-none focus-visible:outline-emerald-700'
            onClick={isAdding ? onAdd : onSave}>
            {isAdding ? 'Add' : 'Save'}
          </button>
        </AlertDialog.Action>
      </div>
    </Form.Root>
  );
};

export default TaskForm;

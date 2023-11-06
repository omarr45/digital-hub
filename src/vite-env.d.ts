/// <reference types="vite/client" />

import { colorProp } from '@radix-ui/themes';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Done';

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  onDelete: (id: string) => void;
};

export type TaskPropsWithoutOnDelete = Omit<TaskProps, 'onDelete'>;

export type FormProps = {
  initData: TaskPropsWithoutOnDelete | null;
};

export type TasksContextProps = {
  tasksDB: TaskPropsWithoutOnDelete[];
  setTasksDB: React.Dispatch<React.SetStateAction<TaskPropsWithoutOnDelete[]>>;
  tasksUI: TaskPropsWithoutOnDelete[];
  setTasksUI: React.Dispatch<React.SetStateAction<TaskPropsWithoutOnDelete[]>>;
};

export type statusColorType = { [key in TaskStatus]: typeof colorProp.default };

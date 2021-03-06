import find from 'lodash/find';
import toArray from 'lodash/toArray';
import { GetterTree } from 'vuex';
import { Task, TaskMeta } from '@/model/task';
import { TaskType } from '@/model/task-type';
import { RotkehlchenState } from '@/store/store';
import { TaskState } from '@/store/tasks/state';

export const getters: GetterTree<TaskState, RotkehlchenState> = {
  isTaskRunning: (state: TaskState) => (type: TaskType): boolean => {
    return !!find(state.tasks, item => item.type === type);
  },

  metadata: (state: TaskState) => (type: TaskType): TaskMeta | undefined => {
    const task = find(state.tasks, item => item.type === type);
    if (task) {
      return task.meta;
    }
    return undefined;
  },

  hasRunningTasks: (state: TaskState): boolean => {
    return Object.keys(state.tasks).length > 0;
  },

  tasks: (state: TaskState): Task<TaskMeta>[] => {
    return toArray(state.tasks);
  }
};

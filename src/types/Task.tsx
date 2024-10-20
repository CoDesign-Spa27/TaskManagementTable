export interface Task {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'InProgress' | 'Completed';
  }
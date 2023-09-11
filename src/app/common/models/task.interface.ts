export interface Task {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  state: 'in queue' | 'in progress' | 'done';

  userName?: string;
  userId?: string;
}
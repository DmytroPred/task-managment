import { User } from "./user.interface";

export interface Task {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  state: 'in queue' | 'in progress' | 'done';

  assignedUser?: User;
}
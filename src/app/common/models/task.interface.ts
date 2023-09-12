import { State } from "./state.type";
import { User } from "./user.interface";

export interface Task {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  state: State;

  assignedUser?: User;
}
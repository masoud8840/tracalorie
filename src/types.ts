interface IInputShape {
  name: string;
  type?: string;
  label?: string;
}

interface IListItemShape {
  _id: string;
  title: string;
  calorie: number;
}

interface IListBaseProps {
  listTitle: string;
  theme: string;
  buttonLabel: string;
  listItems: IListItemShape[];
}

interface IMeal {
  _id: string;
  title: string;
  calorie: number;
}
interface IWorkout {
  _id: string;
  title: string;
  calorie: number;
}

interface ICalorie {
  limit: number;
  gain_loss: number;
  consumed: number;
  burned: number;
  remaining: number;
}

interface IUser {
  email: string;
  password?: string;
  calories: ICalorie;
  meals: IMeal[];
  workouts: IWorkout[];
  createdAt: Date;
  updatedAt: Date;
}

export type {
  IInputShape,
  IListItemShape,
  IListBaseProps,
  IUser,
  IMeal,
  IWorkout,
  ICalorie,
};

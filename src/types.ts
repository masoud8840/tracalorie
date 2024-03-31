interface IInputShape {
  name: string;
  type?: string;
  label?: string;
}

interface IListItemShape {
  name: string;
  calorie: number;
}

interface IListBaseProps {
  listTitle: string;
  theme: string;
  buttonLabel: string;
  listItems: IListItemShape[];
}
export type { IInputShape, IListItemShape, IListBaseProps };

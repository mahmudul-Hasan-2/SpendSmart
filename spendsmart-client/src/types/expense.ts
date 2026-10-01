export interface IExpense {
  _id?: string;
  title: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Shopping' | 'Others';
  date: string;
}

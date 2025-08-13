export interface Plan {
  age: number;
  description: string[];
  name: string;
  price: number;
}

export type User = {
  name: string
  lastName: string
  birthDay: string
}

export interface PlansList {
  list: Plan[]
}
export interface Plan {
  age: number;
  description: string[];
  name: string;
  price: number;
}

export interface User {
  name: string
  lastName: string
  birthDay: string
}

export interface PlansList {
  list: Plan[]
}
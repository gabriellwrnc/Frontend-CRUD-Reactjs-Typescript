export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const dummyEmployee: Employee[] = [
  {
    id: Math.random().toString(36).substring(2),
    firstname: 'Gabriel',
    lastname: 'Jamrewav',
    email: 'gabriel.jamrewav@gmail.com',
  },
  {
    id: Math.random().toString(36).substring(2),
    firstname: 'Chealsea',
    lastname: 'Tumbelaka',
    email: 'chelc.tumbelaka@gmail.com',
  },
  {
    id: Math.random().toString(36).substring(2),
    firstname: 'Muhammad',
    lastname: 'Fauzan',
    email: 'muhammad.fauzan@gmail.com',
  },
];

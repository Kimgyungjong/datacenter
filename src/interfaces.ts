export interface DataProps {
  id: number;
  name: string;
  path: string;
  ext: string;
  size: string;
  url: string;
  createUser: string;
  createDate: string;
  updateDate: string;
  updateUser: string;
}
export interface ComponentProps {
  data: DataProps[];
}

export interface DashboardProps {
  setAuthenticated: (authenticated: boolean) => void;
}

export interface directoryProps {
  id: number;
  name: string;
  url: string;
  createUser?:string;
  createDate?:string;
  updateUser?:string;
  updateDate?:string;
}
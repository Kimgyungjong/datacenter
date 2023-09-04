export interface DataProps {
  id: number;
  name: string;
  path: string;
  ext: string;
  size: string;
  createUser: string;
  createDate: string;
  updateDate: string;
  updateUser: string;
}
export interface DashboardProps {
  setAuthenticated: (authenticated: boolean) => void;
}

export interface ComponentProps {
  data: DataProps[];
}

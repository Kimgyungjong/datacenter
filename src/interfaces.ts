export interface DataProps {
  id: number;
  name: string;
  path: string;
  ext: string;
  type: string;
  size: string;
  url: string;
  createUser: string;
  createDate: string;
  updateDate: string;
  updateUser: string;
}
export interface SortProps {
  storageType: string;
  sort: string;
  order: string;
}
export interface ComponentProps {
  data: DataProps[];
  doubleClick: (item: DataProps) => void;
}

export interface DashboardProps {
  setAuthenticated: (authenticated: boolean) => void;
}
// 왼쪽 트리 리스트 프로퍼티
export interface directoryProps {
  id: number;
  name: string;
  url: string;
  createUser?: string;
  createDate?: string;
  updateUser?: string;
  updateDate?: string;
}
export interface ItemProps {
  id: number;
  name: string;
  type: string;
}
export interface TreeProps {
  item: ItemProps;
  handleActive: (item: ItemProps) => void;
  folderArray: directoryProps[] | null | undefined;
  activeId: number | undefined;
}

export interface ListProps {
  folderArray: directoryProps[] | null | undefined;
  isActiveItem: boolean;
}

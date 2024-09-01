export interface ISidebarItem {
  id: string;
  name: string;
  route: string;
}

export interface IChild {
  name: string;
  age: string;
}

export interface IParent {
  name: string;
  age: string;
  children: IChild[];
}

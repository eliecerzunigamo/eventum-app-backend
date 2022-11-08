export enum Programs {
  SystemEngineering = "ingeniería de sistemas",
}

export type program = keyof typeof Programs;

export enum Roles {
  Student = "estudiante",
  Teacher = "profesor",
  Employee = "funcionario",
  Director = "director de programa",
}

export type roles = keyof typeof Roles;

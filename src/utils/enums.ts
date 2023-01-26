export enum Programs {
  SystemEngineering = "ingeniería de sistemas",
}

export type program = keyof typeof Programs;

export enum Roles {
  Student = "estudiante",
  Teacher = "docente",
  Professional = "profesional",
  Director = "director de programa",
  Other = "otro",
}

export type roles = keyof typeof Roles;

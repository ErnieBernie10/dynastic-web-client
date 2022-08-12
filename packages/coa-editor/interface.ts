
export interface Pos {
  x: number;
  y: number;
}

export interface Section {
  src: string;
  pos: Pos;
}

export interface CoaConfiguration {
  frame?: string;
  sections?: Section[];
}
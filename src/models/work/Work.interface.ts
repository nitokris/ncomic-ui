import {Author, Circle, Label} from "src/models";

export interface Work {
  id: number
  title: string
  authors: Set<Author>
  circle: Circle
  tags: Set<Label>
  release: string
}

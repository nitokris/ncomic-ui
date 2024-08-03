import {Work} from "src/models";

export interface WorksApiClientInterface {

  fetchWorks: (param: any) => Promise<Work[]>

  fetchWork: (id: string) => Promise<Work>

}

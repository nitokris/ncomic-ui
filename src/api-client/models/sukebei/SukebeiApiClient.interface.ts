import {SukebeiResp} from "src/models";

export interface SukebeiApiClientInterface {
  search(keyword: string, page: number): Promise<SukebeiResp>;
}

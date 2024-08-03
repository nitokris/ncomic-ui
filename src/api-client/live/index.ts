import {ApiClientInterface, WorksApiClientModel} from "src/api-client/models";

const apiLiveClient: ApiClientInterface = {
  works: new WorksApiClientModel({
    endpoints: {
      fetchWorks: '/work/list',
      fetchWork: '/work/{id}'
    }
  })
}

export {apiLiveClient};

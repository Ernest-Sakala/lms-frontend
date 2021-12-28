import { BaseUrl } from "../util/base-url"


export class QuestionsApi {
  
  public static  addAns : string = BaseUrl.BASE_URL + "/question/add"

  public static  editAns : string = BaseUrl.BASE_URL + "/question/edit"

  public static  getAns : string = BaseUrl.BASE_URL + "/question/answers"

  public static  deleteAns : string = BaseUrl.BASE_URL + "/question/delete"
  
}

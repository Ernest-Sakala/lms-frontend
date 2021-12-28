import { BaseUrl } from "../util/base-url"


export class LoanApi {
    
public static  requestLn : string = BaseUrl.BASE_URL + "/loan/request"

  public static  editLn : string = BaseUrl.BASE_URL + "/loan/edit"

  public static  getLn : string = BaseUrl.BASE_URL + "/loan/loans"

  public static  deleteLn : string = BaseUrl.BASE_URL + "/loan/delete"
  


}

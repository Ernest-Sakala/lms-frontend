import {BaseUrl} from '../util/base-url'


export class UserApi {

  public static  login : string = BaseUrl.BASE_URL + "/user/login"

  public static  register : string = BaseUrl.BASE_URL + "/user/register"

  public static  users : string = BaseUrl.BASE_URL + "/user/users"

  public static  delete : string = BaseUrl.BASE_URL + "/user/delete"
  

}

/*tslint:disable interface-name*/
import { UserFull } from './UserFull.g';
/* import {object} from "./object.g"; */

export interface UserFullPagedResult /* extends object */ {
  count: number;
  result: UserFull[];
}

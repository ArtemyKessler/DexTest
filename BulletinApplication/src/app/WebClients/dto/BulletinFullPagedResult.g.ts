/*tslint:disable interface-name*/
import { BulletinFull } from './BulletinFull.g';
/* import {object} from "./object.g"; */

export interface BulletinFullPagedResult /* extends object */ {
  count: number;
  result: BulletinFull[];
}

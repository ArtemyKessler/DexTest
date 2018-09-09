/*tslint:disable interface-name*/
import { BulletinDto } from './BulletinDto.g';
import { BasePaged } from './BasePaged.g';

export interface BulletinPage extends BasePaged {
  bulletins: BulletinDto[];
}

/*tslint:disable interface-name*/

export interface BulletinDto {
  id: string;
  created: Date;
  number: number;
  user: string;
  content: string;
  rating: number;
}

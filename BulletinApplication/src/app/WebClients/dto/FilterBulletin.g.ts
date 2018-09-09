/*tslint:disable interface-name*/
import { Paged } from './Paged.g';
import { SortParamDto } from './SortParamDto.g';

export interface FilterBulletin {
  pageFilter: Paged;
  sortParams: SortParamDto[];
  userId: string | null;
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
}

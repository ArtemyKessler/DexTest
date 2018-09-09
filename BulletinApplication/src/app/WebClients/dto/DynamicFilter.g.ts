/*tslint:disable interface-name*/
import { Filter } from './Filter.g';
import { Paged } from './Paged.g';
import { SortParamDto } from './SortParamDto.g';

export interface DynamicFilter {
  filter: Filter;
  paged: Paged;
  sortParams: SortParamDto[];
}

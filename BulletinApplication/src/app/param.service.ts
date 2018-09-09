import { Injectable } from '@angular/core';
import { Param } from './param';

@Injectable({
  providedIn: 'root',
})
export class ParamService {
  params: Param[] = [
    { russianParamName: 'Номер', englishParamName: 'number' },
    { russianParamName: 'Создано', englishParamName: 'created' },
    { russianParamName: 'Объявление', englishParamName: 'content' },
    { russianParamName: 'Рейтинг', englishParamName: 'rating' },
    { russianParamName: 'Пользователь', englishParamName: 'user' },
  ];
  constructor() {}
}

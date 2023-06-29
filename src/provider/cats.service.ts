import { Injectable } from '@nestjs/common';
import { Cat } from '../interface/cats.interface';
import { get } from 'http';

@Injectable()
class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  find(): Cat[] {
    return this.cats;
  }

  findAll(): Cat[] {
    return [
      {
        id: 1,
        name: 'Micmic',
        color: 'Black',
        age: 2,
      },
      {
        id: 2,
        name: 'Hello',
        color: 'Yellow',
        age: 3,
      },
      {
        id: 3,
        name: 'World',
        color: 'Green',
        age: 1,
      },
    ];
  }
}

export default CatsService;

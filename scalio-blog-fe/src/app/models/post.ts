export class Post {
  id?: number;
  body!: string;
  title!: string;
  userId: number = 1;
  createdAt?: string;
  updatedAt?: string;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}

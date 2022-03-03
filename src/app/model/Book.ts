export class Book{
  id: number
  title: string
  author: string
  description: string


  constructor(id: number, title: string, author: string, description: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
  }
}

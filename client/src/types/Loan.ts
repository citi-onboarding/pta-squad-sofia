import { Book } from "./Book";

export interface Loan {
    id: string;
    customerName: string;
    customerEmail: string;
    rentalDate: Date;
    dueDate: Date;
    status: string;
    bookId: string;
    book: Book;
}
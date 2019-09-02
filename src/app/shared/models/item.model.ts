import { Deserializable } from './deserializable.model';

export class Item implements Deserializable {
    id: number;
    name: string;
    link: string;
    dateEntered: Date;
    rel: {
        name: string,
        link: string;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
  
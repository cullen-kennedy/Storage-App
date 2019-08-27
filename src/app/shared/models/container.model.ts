import { Deserializable } from './deserializable.model';

export class Container implements Deserializable {
    id: number;
    name: string;
    link: string;
    date_entered: Date;
    rel: {
        category_name: string,
        location_name: string
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}

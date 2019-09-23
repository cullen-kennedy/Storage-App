import { Deserializable } from './deserializable.model';

export class Container implements Deserializable {
    id: number;
    name: string;
    link: string;
    dateEntered: Date;
    rel: {
        categoryName: string,
        locationName: string
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}

export class ContainerForCreation {
    name: string;
    categoryId: number;
    locationId: number;
}

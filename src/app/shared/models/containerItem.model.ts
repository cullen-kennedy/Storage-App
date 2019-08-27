import { Deserializable } from './deserializable.model';

export class ContainerItem implements Deserializable {
    id: number;
    name: string;
    link: string;
    date_entered: Date;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}


export class ContainerItemForCreation {
    name: string;
}

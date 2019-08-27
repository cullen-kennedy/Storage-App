//Used by datasource / mat table

export interface Item {
    id: number;
    name: string;
    link: string;
    date_entered: Date;
    rel: {name: string,
        link: string;
    }
}
  
export interface Products {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rating:      Rating;
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

export interface Rating {
    rate:  number;
    count: number;
}

export interface DolarBCV {
    fuente:             string;
    nombre:             string;
    compra:             null;
    venta:              null;
    promedio:           number;
    fechaActualizacion: Date;
}


export interface Datetime {
    date: string;
    time: string;
}

export interface Monitor {
    change:          number;
    color:           string;
    image:           string;
    last_update:     string;
    last_update_old: string;
    percent:         number;
    price:           number;
    price_old:       number;
    symbol:          string;
    title:           string;
}

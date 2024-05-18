export type Guitar ={
    id: number
    name: string
    image: string
    description: string
    price: number
}
//Usamos herencia para pasarle los atributos a cartItem
export type cartItem = Guitar & {
    quantity: number
}

export type GuitarID = Guitar["id"]
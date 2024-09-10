export class Pedido {
    constructor(
      readonly id: string,
      readonly productos: ProductoPedido[],
      readonly cliente: Cliente,
      readonly fecha: Date,
      readonly total: number
    ) {}
  }
  
  export class ProductoPedido {
    constructor(
      readonly productoId: string,
      readonly cantidad: number
    ) {}
  }
  
  export class Cliente {
    constructor(
      readonly nombre: string,
      readonly direccion: string,
      readonly telefono: string
    ) {}
  }
  
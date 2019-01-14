export class Movimiento{
    anio: number;
    fecha: Date;
    nombre: string;
    tipo: string;
    monto: number;
    usuario: string;

    getUsuarioCorto(){
        if (this.usuario.startsWith('fed_lanza')){
            return 'Fede'
        }else if (this.usuario.startsWith('ceciliacampos')){
            return 'Ceci'
        }else{
            return 'Sin User'
        }
    }
}
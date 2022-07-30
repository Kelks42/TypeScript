import Carro from "./Carro";
import cliente from "./cliente";
import funcionario from "./funcionario";
import CompraCarro from "./compra_carro";
import cliente from "./cliente";
import funcionario from "./funcionario";
import funcionario from "./funcionario";

let car = new Carro("Touareg", 2018, 40000)
let cliente = new cliente("Enio", 50000)
let funcionario = new funcionario("Gabriel")
let compra = new CompraCarro(cliente, funcionario, car)

compra.detalharCompra()
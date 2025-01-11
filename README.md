## MONOREPO EXTENSIONES CONTABILIUM

### apps - Usando WXT (Framework para hacer extensiones web)

desabilitar-funciones;

Desabilita productos de la lista de productos cuando estamos en ventas desde POS, tambien desabilita el boton para
duplicar factura en la vista de facturas.

Ademas de eso tiene la funcionalidad para abrir un dialog preguntando sobre opciones de garantia extendida,
para modificar el deposito desde donde fijarse el stock modificar la constante que esta en data/constants/deposito.ts

para modificar los articulos que permiten abrir el dialog modificar la constante que esta en data/constats?articulosConGarantiaExtendida.ts

scripts:
(desde la raiz del proyecto)
pnpm dp dev : correr el proyecto en modo desarrollo

pnpm dp build : compilar el codigo y hacer el build

pnpm dp zip : hacer el build y empaquetar la extension

### funcionalidades-extras:

Pensaba hacer un par de cosas que me habian pedido Gaston y Giselle pero tuve que postergarlo

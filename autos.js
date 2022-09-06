//modulo con la base de datos de los autos

let autos=[
    {
        marca: 'Ford',
        modelo: 'Fiesta',
        precio: 150000,
        km: 200,
        color: 'Azul',
        cuotas: 12,
        anio: 2019,
        patente: 'APL123',
        vendido: false
    },
    {
        marca: 'Toyota',
        modelo: 'Corolla',
        precio: 100000,
        km: 0,
        color: 'Blanco',
        cuotas: 14,
        anio: 2019,
        patente: 'JJK116',
        vendido: false
    },
    {
        marca: 'Wolkswagen',
        modelo: 'Voyage',
        precio: 90000,
        km: 50,
        color: 'Gris',
        cuotas: 20,
        anio: 2021,
        patente: 'GYU267',
        vendido: false
    },
    {
        marca: 'Kia',
        modelo: 'Rio',
        precio: 180000,
        km: 105,
        color: 'Verde',
        cuotas: 18,
        anio: 2021,
        patente: 'ABC254',
        vendido: true
    }
];

module.exports=autos;
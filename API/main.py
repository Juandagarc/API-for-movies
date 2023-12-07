from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Configurar CORS para permitir todas las solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar la carpeta de imágenes estáticas
app.mount("/images", StaticFiles(directory="images"), name="images")

@app.get("/")
def read_root():
    return {"API": "Is running"}

# Se definen las 6 peliculas por defecto
peliculas = [
    {
        "id": 1,
        "titulo": "El señor de los anillos: La comunidad del anillo",
        "descripcion": "Un hobbit llamado Frodo Bolsón (Elijah Wood) hereda de su tío un anillo mágico y maligno que necesita ser destruido antes de que caiga en manos del malvado Sauron. Se une entonces a una comunidad de hobbits, elfos, enanos y humanos, y emprende un viaje a través de la Tierra Media para destruir el anillo en el volcán de la Montaña del Destino, donde fue creado. Pero la misión se complica cuando el malvado Sauron ordena a sus criaturas que los persigan.",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2001,
        "duracion": 178,
        "imagen": "Anillos1",
        "extension": "jpeg"
    },
    {
        "id": 2,
        "titulo": "El señor de los anillos: Las dos torres",
        "descripcion": "Frodo Bolsón y Sam continúan su viaje hacia Mordor para destruir el Anillo Único. Mientras, y tras la dura batalla contra los orcos donde cayó Boromir, el hombre Aragorn, el elfo Legolas y el enano Gimli intentan rescatar a los medianos Merry y Pipin, secuestrados por los orcos de Mordor. Por su parte, Saurón y el traidor Sarumán continúan con sus planes en Mordor, a la espera de la guerra contra las razas libres de la Tierra Media.",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2002,
        "duracion": 179,
        "imagen": "Anillos2",
        "extension": "jpeg"
    },
    {
        "id": 3,
        "titulo": "El señor de los anillos: El retorno del rey",
        "descripcion": "Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, cuyo trono será reclamado por Aragorn. Sauron se dispone a lanzar un ataque decisivo contra Gondor. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, con la esperanza de llegar al Monte del Destino. (FILMAFFINITY)",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2003,
        "duracion": 201,
        "imagen": "Anillos3",
        "extension": "jpg"
    },
    {
        "id": 4,
        "titulo": "El Hobbit: Un viaje inesperado",
        "descripcion": "Precuela de la trilogía 'El Señor de los Anillos', obra de J.R.R. Tolkien. En compañía del mago Gandalf y de trece enanos, el hobbit Bilbo Bolsón emprende un viaje a través del país de los elfos y los bosques de los trolls, desde las mazmorras de los orcos hasta la Montaña Solitaria, donde el dragón Smaug esconde el tesoro de los Enanos. Finalmente, en las profundidades de la Tierra, encuentra el Anillo Único, hipnótico objeto que será posteriormente causa de tantas sangrientas batallas en la Tierra Media.",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2012,
        "duracion": 169,
        "imagen": "Hobbit1",
        "extension": "jpeg"
    },
    {
        "id": 5,
        "titulo": "El Hobbit: La desolación de Smaug",
        "descripcion": "Continúan las aventuras de Bilbo Bolsón, Gandalf y los trece enanos, dirigidos por Thorin Escudo de Roble, en su empeño por recuperar la Montaña Solitaria y el reino de los enanos, usurpado por el dragón Smaug. En su periplo, tendrán que enfrentarse a multitud de peligros y harán frente al temible necromante, que no es otro que una manifestación de Sauron, el Señor Oscuro.",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2013,
        "duracion": 161,
        "imagen": "Hobbit2",
        "extension": "jpeg"
    },
    {
        "id": 6,
        "titulo": "El Hobbit: La batalla de los cinco ejércitos",
        "descripcion": "Bilbo Bolsón y los trece enanos, liderados por Thorin Escudo de Roble, continúan su viaje para reconquistar Erebor. En la Montaña Solitaria, se encuentran con el dragón Smaug, en cuyo poder está la llave de la despoblada ciudad de los enanos, donde se encuentra el fabuloso tesoro de los reyes enanos. Bilbo y los suyos conseguirán recuperarlo, pero eso no es más que el comienzo de la aventura. Ahora deberán afrontar los peligros que surgen tras haber despertado a la bestia: Smaug enfurece y envía sus huestes a destruir los poblados cercanos a la montaña. La batalla por la Tierra Media ha comenzado.",
        "director": "Peter Jackson",
        "genero": "Fantasía",
        "año": 2014,
        "duracion": 144,
        "imagen": "Hobbit3",
        "extension": "jpeg"
    }
]

# Se definen las rutas de la API
@app.get("/peliculas")
def get_peliculas():
    for pelicula in peliculas:
        # Actualiza la ruta de la imagen solo una vez, no en cada iteración
        pelicula["imagen"] = f"{pelicula['imagen']}"
    return peliculas




@app.get("/peliculas/{id}")
def get_pelicula(id: int):
    for pelicula in peliculas:
        if pelicula["id"] == id:
            return pelicula
    return {"Error": "No se encontro la pelicula"}

@app.post("/peliculas")
def create_pelicula(pelicula: dict):
    peliculas.append(pelicula)
    return pelicula

@app.put("/peliculas/{id}")
def update_pelicula(id: int, pelicula: dict):
    for i in range(len(peliculas)):
        if peliculas[i]["id"] == id:
            peliculas[i] = pelicula
            return pelicula
    return {"Error": "No se encontro la pelicula"}

@app.delete("/peliculas/{id}")
def delete_pelicula(id: int):
    for i in range(len(peliculas)):
        if peliculas[i]["id"] == id:
            peliculas.pop(i)
            return {"Mensaje": "Pelicula eliminada"}
    return {"Error": "No se encontro la pelicula"}

# Se actualizan los id de las peliculas
for i in range(len(peliculas)):
    peliculas[i]["id"] = i + 1

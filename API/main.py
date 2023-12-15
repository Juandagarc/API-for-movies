from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")

# Configura CORS
origins = [
    "http://localhost:5173",  # Agrega aquí la URL de tu aplicación de React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define el modelo Pydantic para la película
class PeliculaCreate(BaseModel):
    titulo: str
    descripcion: str
    director: str
    genero: str
    año: int
    duracion: int
    imagen: str
    extension: str

# Define el modelo SQLAlchemy para la película
Base = declarative_base()
class Pelicula(Base):
    __tablename__ = 'peliculas'
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, unique=True)
    descripcion = Column(String)
    director = Column(String)
    genero = Column(String)
    año = Column(Integer)
    duracion = Column(Integer)
    imagen = Column(String)
    extension = Column(String)

# Configura la base de datos SQLite
DATABASE_URL = "sqlite:///./peliculas.db"
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Ruta para agregar una nueva película
@app.post("/agregar_pelicula")
def agregar_pelicula(pelicula: PeliculaCreate):
    with SessionLocal() as db:
        db_pelicula = Pelicula(**pelicula.dict())
        db.add(db_pelicula)
        db.commit()
        db.refresh(db_pelicula)
        return {"mensaje": "Película agregada exitosamente", "data": db_pelicula}

# Ruta para obtener todas las películas
@app.get("/peliculas")
def obtener_peliculas():
    with SessionLocal() as db:
        peliculas = db.query(Pelicula).all()
        return peliculas

# Ruta para obtener una película por ID
@app.get("/pelicula/{pelicula_id}")
def obtener_pelicula(pelicula_id: int):
    with SessionLocal() as db:
        pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
        if pelicula:
            return pelicula
        else:
            raise HTTPException(status_code=404, detail="Película no encontrada")

# Ruta para actualizar una película por ID
@app.put("/pelicula/{pelicula_id}")
def actualizar_pelicula(pelicula_id: int, nueva_data: PeliculaCreate):
    with SessionLocal() as db:
        pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

        if pelicula:
            for key, value in nueva_data.dict().items():
                setattr(pelicula, key, value)

            db.commit()
            return {"mensaje": "Película actualizada exitosamente"}
        else:
            raise HTTPException(status_code=404, detail="Película no encontrada")

# Ruta para eliminar una película por ID
@app.delete("/pelicula/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int):
    with SessionLocal() as db:
        pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

        if pelicula:
            db.delete(pelicula)
            db.commit()
            return {"mensaje": "Película eliminada exitosamente"}
        else:
            raise HTTPException(status_code=404, detail="Película no encontrada")

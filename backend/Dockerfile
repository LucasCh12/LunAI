# Imagen base de Python
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código del backend
COPY . /app


# Exponer el puerto del backend
EXPOSE 5000

# Comando para ejecutar la app
CMD ["python", "app.py"]

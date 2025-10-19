# Etapa base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa react-scripts
EXPOSE 3000

# Comando por defecto (modo desarrollo)
CMD ["npm", "start"]

# Use uma imagem base do Node.js
FROM node:14

# Configura o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação usa
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "start"]

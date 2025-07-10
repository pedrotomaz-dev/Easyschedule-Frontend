# Etapa 1: build Angular
FROM node:20 as builder

WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala as dependências
RUN npm install -g @angular/cli angular-cli-ghpages && \
    npm install

# Faz o build do Angular
RUN ng build --configuration production --base-href="https://pedrotomaz-dev.github.io/Easyschedule-Frontend/"

# Etapa 2: deploy (roda diretamente a partir do container)
CMD ["npx", "angular-cli-ghpages", "--dir=dist/EasySchedule-Angular"]

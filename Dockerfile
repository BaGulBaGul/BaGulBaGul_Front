FROM node

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

#먼저 의존성을 install해서 레이어 재사용
RUN npm install

COPY ./ ./

ENTRYPOINT ["npm", "run", "dev"]
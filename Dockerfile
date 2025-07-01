FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /tests

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
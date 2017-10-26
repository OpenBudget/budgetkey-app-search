FROM node:8-alpine

RUN apk add --update git

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN cd /app && npm install --dev

COPY . /app/

ENV NODE_ENV=production
WORKDIR /app

# uncomment the following line to enable integration with custom budgetkey-ng2-components, see README for details
# RUN cd .budgetkey-ng2-components && npm install --dev && npm run prebuild && npm run prepublish && npm run install-into /app

EXPOSE 8000

CMD npm start

FROM node:7.4.0
ADD package.json .
RUN npm install --silent
ADD components components
ADD app app
ENV NODE_ENV production
CMD ["node", "--harmony", "app/index.js"]

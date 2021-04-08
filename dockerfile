FROM 192.168.22.99/node image

ENV NODE_HOME /usr/local/src/node
ENV PATH=$NODE_HOME/bin:$PATH

COPY ./dist/ /app/dist/
COPY ./node_modules/ /app/node_modules/

EXPOSE 80/TCP

CMD node /app/dist/server/main.tsx





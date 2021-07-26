FROM node:alpine AS base

ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV PATH "$PATH:/app"
ENTRYPOINT ["pingg"]
# Default-Gateway is hard to determine inside docker, so omit it by default
CMD ["8.8.8.8", "1.1.1.1"]

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install updates
RUN apk upgrade --no-cache

COPY package.json \
     package-lock.json \
     /app/

# Install build dependencies
FROM base AS build
RUN apk add --no-cache linux-headers git python3 make g++

# HACK: to get netutils working
RUN ln -s /usr/include/linux/sysctl.h /usr/include/sys/

# Install app dependencies
RUN npm install  --production

# Make app image
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY pingg ts.js /app/

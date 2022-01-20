FROM ubuntu:latest

# Install deps
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update -y && apt upgrade -y

RUN apt install -y \    
    libnss3-dev \
    libgdk-pixbuf2.0-dev \
    libgtk-3-dev \
    libxss-dev \
    wget \
    unzip \
    tzdata \
    curl \
    gnupg

# Install Node.js

RUN apt update -y

RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs

# Install Chrome + Chrome driver

WORKDIR /tmp/install-google-chrome

RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y /tmp/install-google-chrome/google-chrome-stable_current_amd64.deb
RUN rm /tmp/install-google-chrome/google-chrome-stable_current_amd64.deb 

COPY ./install_chrome_driver.sh /tools/install_chrome_driver.sh

RUN /bin/bash /tools/install_chrome_driver.sh

# Install docker

RUN apt-get update -y && apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

RUN echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt-get update && apt-get install -y \
	docker-ce \
	docker-ce-cli \
	containerd.io

# RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" \
#      -o /usr/local/bin/docker-compose

# RUN chmod +x /usr/local/bin/docker-compose

RUN apt install -y \
    docker-compose

# Prepare tests

WORKDIR /src

RUN npm install -g yarn

COPY ./package.json /src/package.json
COPY ./yarn.lock /src/yarn.lock

RUN yarn

COPY ./wdio.conf.ts /src/wdio.conf.ts
COPY ./docker-compose.yml /src/docker-compose.yml

COPY ./test /src/test

CMD yarn run test
# CMD tail -f /dev/null

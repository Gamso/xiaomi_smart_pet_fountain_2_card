FROM ghcr.io/home-assistant/home-assistant:latest

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Install additional tools if needed
# RUN apk add --no-cache bash

# The Home Assistant image already has an entrypoint that starts Home Assistant
# We'll let it run in the background

WORKDIR /workspaces/xiaomi_smart_pet_fountain_2_card


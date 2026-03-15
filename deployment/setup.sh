#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable debug mode
set -x

GITHUB_PACKAGES_TOKEN=$1
ENV=$2
GHCR_USER=$3

export BEASTLY_BRAWL_IMAGE="ghcr.io/${GHCR_USER}/beastly-brawl-${ENV}:latest"

cd ~/deployment

echo "${GITHUB_PACKAGES_TOKEN}" | docker login ghcr.io -u ${GHCR_USER} --password-stdin 
# Get the latest image from GHCR
docker compose pull

# Restart containers with updated image
docker compose down
docker compose up -d

# Disable debug mode
set +x
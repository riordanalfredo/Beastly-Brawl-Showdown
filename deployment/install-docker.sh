#!/usr/bin/env bash
set -euo pipefail

# Optional: pass username as first arg; defaults to current user
TARGET_USER="${1:-${SUDO_USER:-$USER}}"

echo "[1/6] Remove old Docker packages (if any)"
sudo apt-get remove -y docker docker-engine docker.io containerd runc || true

echo "[2/6] Install prerequisites"
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

echo "[3/6] Add Docker GPG key and repo"
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "[4/6] Install Docker Engine + Compose plugin"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "[5/6] Enable and start Docker service"
sudo systemctl enable --now docker

echo "[6/6] Allow non-sudo Docker for user: $TARGET_USER"
sudo groupadd docker 2>/dev/null || true
sudo usermod -aG docker "$TARGET_USER"

echo
echo "Done."
echo "Run this to apply group change in current shell:"
echo "  newgrp docker"
echo "Then verify:"
echo "  docker --version"
echo "  docker compose version"
echo "  docker run --rm hello-world"
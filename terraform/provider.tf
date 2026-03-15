terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    endpoints = {
      s3 = "https://syd1.digitaloceanspaces.com"
    }

    bucket = "spaces-beastly-brawl"

    # This deactivates some AWS S3 features that are not needed for DigitalOcean Spaces.
    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_s3_checksum            = true
    region                      = "us-east-1"
  }
}

provider "digitalocean" {
    token = var.do_token
}

terraform {
  backend "s3" {
    bucket  = "bookmarklet-link-tfstates"
    encrypt = true
    key     = "terraform.tfstate"
    region  = "us-east-1"
  }
}

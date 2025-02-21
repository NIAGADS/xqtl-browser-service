# NIAGADS xQTL-browser-service

> NOTE: this project is still in **alpha**; as no official releases have been made, it is not yet recommended for use by third-party developers
> NOTE: the project docker build does yet work; placeholder `docker-compose.yaml` file only

This multi-zone `next.js` application creates a portal for interactive browsing and mining of **xQTL** track data and metadata from NIAGADS and FILER (NIAGAD's functional genomics repository).  The service leverages the NIAGADS Alzheimer's Genomics Database to annotate all QTL-linked variants using the Alzheimer's Disease Sequencing Project's (ADSP) annotation pipeline [#TODO -> add citation].  

All of these resources are part of [NIAGADS Open Access Collection](https://www.niagads.org/open-access/)

## Requirements

* git

### Production

* docker
* docker compose
  
### Development

You may develop in the dockerized application as it is configured for hot-reloads. If you wish to develop outside of docker you will require:

* `node`: ^23.3.0
* `npm`: ^10.9.0

## Build

### Workspace

Create an application working directory named & located as per your preference.  For example here we use `/xqtl-browser-project` as our working directory.

```bash
mkdir /xqtl-browser-project
```

Clone the microservices into your working directory.

```bash
cd /xqtl-brwoser-project
git clone https://github.com/NIAGADS/igvbrowser-microservice.git
git clone https://github.com/NIAGADS/track-collection-microservice.git
```

### Configuration Files

## Deploy

### With Docker

### Locally


## Developer notes

> development NIAGADS API only allows port :3000 for CORS

This project is built off the NIAGADS [nextjs-template](https://github.com/NIAGADS/nextjs-template).  Details about keeping this project up-to-date with the newest versions of the template can be found in the template repository README.

# NIAGADS xQTL-explorer-service

> NOTE: this project is still in **alpha**.  As no official releases have been made, it is not yet recommended for use by third-party developers

> NOTE: a single, simple docker build that runs all the related services is coming soon; in the meanwhile, please pardon our dust.

This multi-zone `next.js` application creates a portal for interactive browsing and mining of AD-relevant **xQTL** track data and metadata from [NIAGADS](https://www.niagads.org) and [FILER](https://tf.lisanwanglab.org/FILER/), NIAGADS's disease-agnositic functional genomics repository.  The service leverages the [NIAGADS Alzheimer's Genomics Database](https://www.niagads.org/genomics) to annotate all QTL-linked variants using the Alzheimer's Disease Sequencing Project's (ADSP) annotation pipeline.  

All of these resources and annotations are part of [NIAGADS Open Access Collection](https://www.niagads.org/open-access/)

The explorer service links two NIAGADS Open Access Microservices:

* [igvbrowser-microservice](https://github.com/NIAGADS/igvbrowser-microservice): a customized IGV Genome Browser for displaying data hosted at NIAGADS
* [track-collection-microservice](https://github.com/NIAGADS/track-collection-microservice): provides a table-browser for all tracks in the collection and individual detailed track-specific reports keyed on the track identifier, which include a metadata summary, a table of the most significant results, and forms for querying the full track data against the [NIAGADS OpenAccess API](https:://api.niagads.org).

## How to Deploy

### Build Requirements

* git

#### Production Deployment Requirements

* docker
* docker compose
  
#### Development Deployment Requirements

You may develop in the dockerized application as it is configured for hot-reloads. If you wish to develop outside of docker you will require:

* `node`: ^20.18.0
* `npm`: ^10.8.2

### Create a Workspace on the Host

To enable hot re-loads and easy rebuilds by pulling updates from the repository, project code is hosted on the server.  Create an application project directory named & located as per your preference.  For example in the following instructions we use `/xqtl-explorer-project` as our project directory.

```bash
mkdir /xqtl-explorer-project
```

Clone this portal service and the child microservices into your working directory.

```bash
cd /xqtl-explorer-project
git clone https://github.com/NIAGADS/xqtl-explorer-service.git
git clone https://github.com/NIAGADS/igvbrowser-microservice.git
git clone https://github.com/NIAGADS/track-collection-microservice.git
```

### Configure the project

#### Configure portal xqtl-explorer-service (this project)

The working directory for the following steps is `xqtl-explorer-service`:

```bash
cd /xqtl-explorer-project/xqtl-explorer-service
```

The portal explorer application has three configuration files that need to be customized:

* `sample.env`: application configuration, accessible by the client web-browser
* `sample.env.local`: application configuration, internal, server-side configuration
* `docker.env.sample`: docker build configuration

##### Portal: `sample.env`

The following properties can be set in this file:

* NEXT_PUBLIC_PROJECT_NAME=`the name of the project`
* NEXT_PUBLIC_PROJECT_PUBLIC_URL=`project domain` 
* NEXT_PUBLIC_PORTAL_PATH=`portal service base path`

Copy to `.env` in the sample directory, and then customize the `.env` file as necessary.

```bash
cp sample.env .env
```

Defaults are for the project hosted at **xqtl.niagads.org**) and then

##### Portal: `sample.env.local`

The following properties in this file can be customized

* PORTAL_PATH=`portal service base path`

> NOTE: `PORTAL_PATH` must be the same as the `NEXT_PUBLIC_PORTAL_PATH` in the `.env` file (i.e., `explorer`)

Copy to `.env.local` in the same directory.

```bash
cp sample.env.local .env.local
```

Customize `PORTAL_PATH` in `.env.local` as needed or and **leave the other settings as is** (breaking changes).

##### Portal: `docker.env.sample`

NIAGADS microservices are templated, not all settings in the `docker.env.sample` file are relevant to this project.  Relevant settings are:

* PORT=`mapped port on host` 
* APPLICATION_DIR=`full path to application code on host`

> NOTE: the `PORT` for the `xqtl-explorer-service` is the one that will be `public` on the host.   This service serves as the public-facing portal for the microservices.

Copy to `docker.env` in the working (same) directory:

```bash
cp docker.env.sample docker.env
```

And then customize the `docker.env` file as follows:  

1. Use the default `PORT` (_3000_) or change as necessary.  
2. Set `APPLICATION_DIR`.  In our example that would be:

```bash
APPLICATION_DIRECTORY=/xqtl-explorer-project/xqtl-explorer-service
```

#### Configure igv-microservice

The working directory for the following steps is `igvbrowser-microservice`:

```bash
cd /xqtl-explorer-project/igvbrowser-microservice
```

The portal explorer application has three configuration files that need to be customized:

* `sample.env`: application configuration, accessible by the client web-browser
* `sample.env.local`: application configuration, internal, server-side configuration
* `docker.env.sample`: docker build configuration

##### igvbrowser: `.env`

The `.env` for the `igvbrowser-microservice` can be copied from the `xqtl-explorer-service`:

```bash
cp ../xqtl-explorer-service/.env .
```

Edit the `.env` file in the current working directory to add the following environmental variable:

```bash
NEXT_PUBLIC_TRACK_COLLECTIONS=filer:ADSP-FunGen-xQTL,filer:AD-related
```

##### igvbrowser: `.env.local`

The `igvbrowser-microservice` does not have a `.env.local` configuration, but the file is required by the docker build.  Simply copy the placeholder file to `.env.local`:

```bash
cp sample.env.local .env.local
```

##### igvbrowser: `docker.env.sample`

NIAGADS microservices are templated, not all settings in the `docker.env.sample` file are relevant to this project.  Relevant settings are:

* PORT=`mapped port on host`
* APPLICATION_DIR=`full path to application code on host`

> NOTE: the `PORT` for the `igvbrowser-microservice` will **NOT** be publicly accessible. This is a `localhost` only service and used for testing purposes.

Copy to `docker.env` in the working (same) directory:

```bash
cp docker.env.sample docker.env
```

And then edit as follows:

1. Use the default `PORT` or change as necessary.  
2. Set `APPLICATION_DIR`.  In our example that would be:

```bash
APPLICATION_DIRECTORY=/xqtl-explorer-project/igvbrowser-microservice
```

#### Configure track-collection-microservice

The working directory for the following steps is `track-collection-microservice`:

```bash
cd /xqtl-explorer-project/track-collection-microservice
```

The microservice has three configuration files that need to be customized:

* `sample.env`: application configuration, accessible by the client web-browser
* `sample.env.local`: application configuration, internal, server-side configuration
* `docker.env.sample`: docker build configuration

##### track-collection: `.env`

The `.env` for the `track-collection-microservice` can be copied from the `xqtl-explorer-service`:

```bash
cp ../xqtl-explorer-service/.env .
```

Edit the `.env` file in the current working directory to add the following environmental variable:

```bash
NEXT_PUBLIC_TRACK_COLLECTION=genomics:ADSP-FunGen-xQTL
```

##### track-collection: `.env.local`

The `track-collection-microservice` does not have a `.env.local` configuration, but the file is required by the docker build.  Simply copy the placeholder file to `.env.local`:

```bash
cp sample.env.local .env.local
```

##### track-collection: `docker.env.sample`

NIAGADS microservices are templated, not all settings in the `docker.env.sample` file are relevant to this project.  Relevant settings are:

* PORT=`mapped port on host`
* APPLICATION_DIR=`full path to application code on host`

> NOTE: the `PORT` for the `track-collection-microservice` will **NOT** be publicly accessible. This is a `localhost` only service and used for testing purposes.

Copy to `docker.env` in the working (same) directory:

```bash
cp docker.env.sample docker.env
```

And then edit as follows:

1. Use the default `PORT` or change as necessary.  
2. Set `APPLICATION_DIR`.  In our example that would be:

```bash
APPLICATION_DIRECTORY=/xqtl-explorer-project/track-collection-microservice
```

### Docker Deployment

Start up each service using `docker compose`.  The `xqtl-explorer-service` will create the network, so start it first.

> NOTE: depending on your system, the `docker compose` command may be `docker-compose`.

* `xqtl-explorer-service`

```bash
cd /xqtl-explorer-project/xqtl-explorer-service
docker compose --env-file docker.env up -d 
```

* `igvbrowser-microservice`

```bash
cd /xqtl-explorer-project/igvbrowser-microservice 
docker compose --env-file docker.env up -d 
```

* `track-collection-microservice`

```bash
cd /xqtl-explorer-project/track-collection-microservice 
docker compose --env-file docker.env up -d 
```

## Developer notes

> development NIAGADS API only allows port :3000 for CORS

This project is built off the NIAGADS [nextjs-template](https://github.com/NIAGADS/nextjs-template).  Details about keeping this project up-to-date with the newest versions of the template can be found in the template repository README.

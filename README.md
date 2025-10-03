# CertifiGet

## What is CertifiGet?

CertifiGet is a web application / service for managing and issuing event certificates. It is designed to help event organizers generate, manage, and distribute digital certificates to participants, such as those who attend workshops, webinars, contests, or any event requiring proof of participation.

In short:

- Organizers can upload templates, participant data, and set parameters for issuance.  
- Participants can access or download their certificates.  
- The system can be self-hosted (e.g. via Docker) or run in a hosted environment.


## Features

- Certificate template support (e.g. custom design, placeholders)  
- Participant certificate access (via web link or unique ID)  
- Docker-based deployment for ease of setup

## Usage guide
**For Participants / Recipients**

-Visit the link.[CertifiGet](https://computerclubkec.github.io/CertifiGet/)

-Select Event.

-Enter your name.

-Download the certificate as PDF. 


**For organizers**

-Upload or create certificate templates.

-Import participant data (name, email, event title, etc.)

-Assign which participants get certificates

-Trigger issuance (bulk or individual)

## Development & Contributing

If you want to contribute:

  1. Fork the repository.
  2. Create a new branch (e.g. feature/my-feature).
  3. Make your changes, with tests if applicable.
  4. Submit a pull request describing your changes.
     
Please follow the existing coding style, write clear commit messages, and ensure compatibility across environments.

## Prerequisites (While contributing)

Before installing / running, ensure you have:

- Docker and Docker Compose (for containerized setup)   
- Git  
- Basic familiarity with command line / environment variables  

## Getting Started (Docker)

Below is a sample sequence to get CertifiGet up and running locally using Docker.

1. **Clone the repository**  
   ```bash
   git clone https://github.com/aanandahero/CertifiGet.git
   cd CertifiGet
   ```
2. **Setup environment**
   ```bash
   cp .env.example .env
   ```
3. **Start via Docker Compose**
   ```bash
   docker-compose up --build
   ```
4. **Access the application**
   
   Once containers are running, open your browser at http://localhost:4000 (or the port you configured).






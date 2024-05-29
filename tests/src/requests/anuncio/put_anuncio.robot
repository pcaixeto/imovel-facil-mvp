*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Reservar anúncio existente e disponível
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=reservar/44     expected_status=200   headers=${header}   


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Reservar anúncio existente e já reservado
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=reservar/44     expected_status=404   headers=${header}   


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Reservar anúncio inexistente
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=reservar/1     expected_status=404   headers=${header}   


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Editar endereço em anuncio existente
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=editar/35     expected_status=200   headers=${header}   data={"endereco": "Rua Nova","bairro": "Bairro Novo"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Editar endereço em anuncio não existente
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=editar/1     expected_status=404   headers=${header}   data={"endereco": "Rua Nova","bairro": "Bairro Novo"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Editar anúncio deixando campos obrigatórios vazios
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=editar/1     expected_status=400   headers=${header}   data={"nomeAnuncio": "Lugar Nenhum","endereco": "","bairro": "","cidade": "","estado": "","descricaoAnuncio": "Este lugar nao existe","valorVendaImovel": 9999999,"valorAluguelImovel": 6000,"valorCondominioApto": 1000,"tamanhoImovel": 0,"numeroQuartos": 0, "numeroMoradoresRepublica": 1, "tipoImovel": 3, "contatos": "meu_email@email.com"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Editar anúncio deixando valor de aluguel negativo
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json


    ${RESPONSE}   PUT on Session   alias=imovelfacil  url=editar/1     expected_status=400   headers=${header}   data={""nomeAnuncio": "Apartamento","endereco": "Rua 1","bairro": "Bairro 2","cidade": "Sao paulo","estado": "SP","descricaoAnuncio": "Pequeno apartamento","valorVendaImovel": 300000,"valorAluguelImovel": -1700,"valorCondominioApto": 400,"tamanhoImovel": 40,"numeroQuartos": 1,"tipoImovel": 2}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


*** Keywords ***

Key 1
    PUT on Session




    

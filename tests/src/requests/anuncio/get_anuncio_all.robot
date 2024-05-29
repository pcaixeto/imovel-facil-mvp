*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Buscar todos os anuncios
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil  url=buscar   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anuncios reservados

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=reservados   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

   
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anuncios disponiveis

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=disponiveis   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anuncio por id

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=consultaPorId/17   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anúncios por estado

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=buscar?estado=CE&cidade&bairro   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anúncios por cidade

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=buscar?estado&cidade=Fortaleza&bairro   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}




Caso Negativo - Buscar anuncio inexistente por id

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=consultaPorId/1   expected_status=404

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


*** Keywords ***

Key 1
    GET on Session




    

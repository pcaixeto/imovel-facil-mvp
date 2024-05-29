*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Buscar meus Imoveis
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/
    ${RESPONSE}  GET on Session   alias=imovelfacil  url=meus-imoveis   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

Caso Positivo - Buscar imóvel por Id 
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/
    ${RESPONSE}  GET on Session   alias=imovelfacil  url=consultaPorId/1   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

Caso Negativo - Buscar imóvel por Id - Id inválido
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/
    ${RESPONSE}  GET on Session   alias=imovelfacil  url=consultaPorId/300   expected_status=404

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

*** Keywords ***

Key 1
    GET on Session
*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Deletar anúncio existente
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${RESPONSE}   DELETE on Session   alias=imovelfacil  url=deletar/30     expected_status=204  


    Log to Console   ${RESPONSE}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Deletar anúncio inexistente
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${RESPONSE}   DELETE on Session   alias=imovelfacil  url=deletar/1     expected_status=404  


    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.text}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


*** Keywords ***

Key 1
    DELETE on Session




    

*** Settings ***
Library               RequestsLibrary
Library               OperatingSystem
Library               JSONLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Buscar anúncios por bairro - Praia do Futuro

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=buscar?estado=&cidade&bairro=Praia do Futuro   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.json()}
    
    ${element_count}=    Get Length    ${RESPONSE.json()}
    Log to Console    Numero de anuncios encontrados: ${element_count}
    
    FOR  ${i}   IN RANGE   ${element_count}
       ${bairro}   Set Variable   ${RESPONSE.json()[${i}]['bairro']}
        Should Be Equal As Strings   ${bairro}   Praia do Futuro
    END


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

Caso Positivo - Buscar anúncios por estado - SP

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=buscar?estado=SP&cidade&bairro   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.json()}
    
    ${element_count}=    Get Length    ${RESPONSE.json()}
    Log to Console    Numero de anuncios encontrados: ${element_count}
    
    FOR  ${i}   IN RANGE   ${element_count}
       ${estado}   Set Variable   ${RESPONSE.json()[${i}]['estado']}
        Should Be Equal As Strings   ${estado}   SP
    END


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Buscar anúncios por cidade - Porto Alegre

    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/
    ${RESPONSE}  GET on Session   alias=imovelfacil   url=buscar?estado&cidade=Porto Alegre&bairro   expected_status=200

    Log to Console   ${RESPONSE}
    Log to Console   ${RESPONSE.json()}
    
    ${element_count}=    Get Length    ${RESPONSE.json()}
    Log to Console    Numero de anuncios encontrados: ${element_count}
    
    FOR  ${i}   IN RANGE   ${element_count}
       ${cidade}   Set Variable   ${RESPONSE.json()[${i}]['cidade']}
        Should Be Equal As Strings   ${cidade}   Porto Alegre
    END


    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


*** Keywords ***

Key 1
    GET on Session
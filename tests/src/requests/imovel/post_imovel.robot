*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Criar imóvel com todos os campos
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=cadastro     expected_status=201   headers=${header}   data={"endereco": "Avenida Paulista", "bairro": "Bela Vista", "cidade": "São Paulo", "estado": "SP", "tamanhoImovel": 50, "numeroQuartos": 2, "numeroMoradoresRepublica": 0, "tipoImovel": 2, "clienteId": 15}

    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Criar imóvel com campos vazios
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=cadastro     expected_status=400   headers=${header}   data={"endereco": "", "bairro": "Bela Vista", "cidade": "São Paulo", "estado": "SP", "tamanhoImovel": 50, "numeroQuartos": 2, "numeroMoradoresRepublica": 0, "tipoImovel": 2, "clienteId": 15}

    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

Caso Negativo - Criar imóvel com Id Cliente inválido
    Create Session   alias=imovelfacil   url=http://localhost:3001/imovel/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=cadastro     expected_status=400   headers=${header}   data={"endereco": "Avenida Paulista", "bairro": "Bela Vista", "cidade": "São Paulo", "estado": "SP", "tamanhoImovel": 50, "numeroQuartos": 2, "numeroMoradoresRepublica": 0, "tipoImovel": 2, "clienteId": 2000}

    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}

*** Keywords ***

Key 1
    POST on Session
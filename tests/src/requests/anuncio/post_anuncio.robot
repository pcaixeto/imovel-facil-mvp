*** Settings ***
Library               RequestsLibrary


*** Variables ***



*** Test Cases ***

Caso Positivo - Criar anúncio com apenas campos obrigatórios
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=criar     expected_status=201   headers=${header}   data={"nomeAnuncio": "Apartamento","endereco": "Rua 1","bairro": "Bairro 2","cidade": "Sao paulo","estado": "SP","descricaoAnuncio": "Pequeno apartamento","valorVendaImovel": 300000,"valorAluguelImovel": 1700,"valorCondominioApto": 400,"tamanhoImovel": 40,"numeroQuartos": 1,"tipoImovel": 2}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Positivo - Criar anúncio com apenas todos os campos, exceto foto
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=criar     expected_status=201   headers=${header}   data={"nomeAnuncio": "Republica USP","endereco": "Rua USP","bairro": "Butanta","cidade": "Sao Paulo","estado": "SP","descricaoAnuncio": "Republica mista proxima a USP","valorVendaImovel": 400000,"valorAluguelImovel": 900,"valorCondominioApto": 200,"tamanhoImovel": 130,"numeroQuartos": 8, "numeroMoradoresRepublica": 6, "tipoImovel": 3, "contatos": "meu_email@email.com"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Criar anuncio faltando campo obrigatorio nomeAnuncio
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=criar     expected_status=400   headers=${header}   data={"nomeAnuncio": "","endereco": "Numero 0","bairro": "Nenhum","cidade": "Algum Lugar","estado": "AC","descricaoAnuncio": "Este lugar nao existe","valorVendaImovel": 9999999,"valorAluguelImovel": 6000,"valorCondominioApto": 1000,"tamanhoImovel": 0,"numeroQuartos": 0, "numeroMoradoresRepublica": 1, "tipoImovel": 3, "contatos": "meu_email@email.com"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Criar anuncio faltando campos obrigatorios referentes ao endereço
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=criar     expected_status=400   headers=${header}   data={"nomeAnuncio": "Lugar Nenhum","endereco": "","bairro": "","cidade": "","estado": "","descricaoAnuncio": "Este lugar nao existe","valorVendaImovel": 9999999,"valorAluguelImovel": 6000,"valorCondominioApto": 1000,"tamanhoImovel": 0,"numeroQuartos": 0, "numeroMoradoresRepublica": 1, "tipoImovel": 3, "contatos": "meu_email@email.com"}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


Caso Negativo - Criar anúncio com valor de venda negativo
    Create Session   alias=imovelfacil   url=http://localhost:3001/anuncio/

    ${header}   Create dictionary   Content-Type=application/json

    ${RESPONSE}   POST on Session   alias=imovelfacil  url=criar     expected_status=400   headers=${header}   data={"nomeAnuncio": "Apartamento","endereco": "Rua 1","bairro": "Bairro 2","cidade": "Sao paulo","estado": "SP","descricaoAnuncio": "Pequeno apartamento","valorVendaImovel": -300000,"valorAluguelImovel": 1700,"valorCondominioApto": 400,"tamanhoImovel": 40,"numeroQuartos": 1,"tipoImovel": 2}


    Log to Console   ${RESPONSE.json()}

    
    Delete All Sessions
    ${return}   Session Exists   alias=imovelfacil
    Log to Console   ${return}


*** Keywords ***

Key 1
    POST on Session



    

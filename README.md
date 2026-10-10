# Luquinhas Boost

Programa gratuito para Windows que limpa e otimiza o PC para jogar **CS2**, com visual escuro e animações discretas.

## O que ele faz

- **Painel:** mostra processador, placa de vídeo, memória, disco e Windows, com o nível de otimização e o botão *Aplicar Recomendados*.
- **Otimizações:** ajustes de desempenho, jogos e privacidade, cada um com interruptor. Todos podem ser desfeitos.
- **CS2:** comando de inicialização, código de mira e duas configs (principal e de treino) com nome, sensibilidade e teclas editáveis, instaladas direto na pasta do jogo.
- **Limpeza:** arquivos temporários, Prefetch, Lixeira, cache do Windows Update e miniaturas, com explicação de cada uma e botão *Limpar Tudo*.
- **Restauração:** cria ponto de restauração, reverte os ajustes do programa ou abre a Restauração do Sistema do Windows.
- **Apps:** lista os programas instalados, com busca, desinstalação em lote e exportação da lista.
- **Configurações:** cor do programa escolhida em um círculo cromático.
- **Aviso de atualização:** avisa quando existe uma versão nova aqui no GitHub.

## Segurança

- O código é aberto: tudo o que o programa faz está no `main.js`.
- Antes de aplicar ajustes, ele cria um **ponto de restauração** do Windows.
- A única conexão com a internet é a consulta de versão nova na API do GitHub.
- Ele abre normalmente. Quando um ajuste ou limpeza precisa de permissão de **administrador**, aparece um botão *Reiniciar como administrador* no topo.
- Como o programa não tem assinatura digital paga, o Windows SmartScreen pode avisar "editor desconhecido". Clique em *Mais informações* e depois em *Executar assim mesmo*.

## Como baixar

Entre em **Releases**, baixe o `.exe` da versão mais recente e abra.

## Como rodar pelo código

1. Instale o [Node.js](https://nodejs.org) (versão LTS).
2. Dê dois cliques em `INICIAR.bat` (ou rode `npm install` e `npm start` como administrador).

## Como gerar o `.exe`

Dê dois cliques em `GERAR-INSTALADOR.bat`. Os arquivos aparecem na pasta `dist`.

## Aviso

Use por sua conta e risco. Os ganhos de FPS dependem do seu PC, e o programa não faz milagres.

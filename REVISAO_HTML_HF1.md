# S-Retorno 1.5.4 — HTML HF1

Data: 08/11/2026, Brasil. Correção candidata para a captura atual do Spresenter; validação física na box pendente.

## Achado e alteração

A captura recebida contém o programa `main.1e8e98fc.js`, SHA-256 `d607547cc218474337a7b2ee30b0dde04030243809cf99923de5f70b5d483826`. A versão anterior do app só reconhecia `main.ff832fdd.js`; portanto não aplicava a adaptação a esse arquivo novo. O CSS `main.eb127441.css` é idêntico ao anterior.

O novo programa usa 24 objetos `inset: 0` e uma atribuição `style.inset = "0"`. O preparo converteu essas ocorrências nas quatro bordas explícitas, renomeou 1.785 bindings lexicais para preservar o escopo durante a conversão e produziu JavaScript ES5 com os mesmos polyfills do perfil anterior.

O registro agora contém os dois JavaScripts e o CSS compartilhado. Os assets antigos foram preservados byte a byte. A verificação Android permanece limitada a Chrome 44–86, mesma origem, nome conhecido e SHA-256 exato. Não se entrega o programa antigo para uma versão desconhecida do servidor. Outra atualização do programa do Spresenter pode exigir um perfil adicional.

Referência do comportamento CSS: [Google — propriedades e atalhos de posicionamento no Chromium 87](https://web.dev/articles/logical-property-shorthands).

## Testes desta entrega

| Verificação | Resultado |
| --- | --- |
| Captura ZIP e hashes | Íntegros; HTML, JS, CSS e duas imagens recebidos |
| Sintaxe ES5 do programa adaptado | Aprovada pelo Acorn |
| Cinco fixtures de escopo/closures/async da transformação | Aprovadas |
| JSDOM com APIs modernas selecionadas removidas | Polyfills, quatro bordas e atualização de letra/elemento aprovados |
| Chromium desktop real 83.0.4103.0, programa original | Área do tema e conteúdo colapsou para 0 × 0, em retorno e saída de imagem |
| Mesmo Chromium, programa adaptado | Tema 1920 × 1080; letra com largura 1728; imagem 1920 × 1080 |
| Redimensionamento e recarga | Tema 1280 × 720; letra com largura 1152; imagem 1280 × 720 |
| WebSocket | Mudança de letra e de elemento confirmadas no navegador |
| Erros JavaScript no teste de navegador | Nenhum nos quatro cenários |
| Mesclagem dos perfis | Repetição idempotente; conflito e arquivo corrompido rejeitados antes de gravar; perfil antigo preservado |
| Assinatura APK | v1 e v2 válidas com o certificado original |
| Alinhamento do APK | Bibliotecas nativas não comprimidas alinhadas em 16 KiB; demais entradas não comprimidas alinhadas em 4 bytes |

O navegador foi executado com HTTP/WebSocket de teste em loopback e com o programa real da captura. Os dados de culto e temas da fixture são sintéticos. Não foi acessado o PC do usuário, não houve execução do firmware BTV/HTV e não foram testados Chrome 44/52 físicos, áudio, NDI nem reprodução de vídeo.

O HTML recebido era da saída `musicos`. O teste cobre a rota normal de imagem dessa saída e a rota `output=stage` do retorno usando o mesmo programa, sem afirmar que o tema particular da igreja foi testado na box. `imported.css`, referenciado na captura, não veio no ZIP; esse arquivo e os recursos de mídia continuam sendo obtidos do servidor.

## APK e versão

Arquivo: `S-Retorno-1.5.4-HTML-HF1.apk`

- Pacote: `br.com.polegar.ndimonitor.tvboxtest`.
- Versão Android: **1.5.4**, código **22**. HF1 identifica a atualização dos assets; não há novo número no aplicativo.
- SHA-256 do APK: `d2f81008010963292d0466d61a3df9062b2a3447b1873208c04e6597de2474a5`.
- Certificado: `6007ea0469cbe58451d689913869fcfd617e6e686967ed8a1e113091eac51421`.
- Base: APK 1.5.4 compilado no Android Studio do usuário e anteriormente assinado com o certificado original.

Somente `assets/html-compat/manifest.json` foi substituído e `assets/html-compat/spresenter-main.1e8e98fc-legacy.js` foi acrescentado, além da regeneração das assinaturas. Todo o restante do conteúdo é idêntico ao APK base: DEX, manifesto Android, recursos, ícone, nome, NDI e áudio.

Não houve nova compilação Gradle nem execução da suíte Android nesta revisão. O projeto fonte inclui o registro atualizado e o ajuste da verificação de empacotamento para aceitar de dois a quatro recursos, conforme o limite já existente no adaptador Java.

## Reproduzir

No diretório `tools/html-compat`, execute `npm ci`, prepare a nova captura em uma pasta temporária com `prepare.cjs` e use `merge-profile.cjs` para incluí-la no perfil existente. Execute `check-transform.cjs`, `check-live.cjs` e `check-browser.cjs` conforme o README dessa pasta.

O utilitário `tools/reempacotar_html.py` permite aplicar somente os assets a um APK já compilado. Sua saída é **sem assinatura**; assine com a chave original e verifique com `apksigner`. A chave privada não faz parte desta entrega.

Os relatórios JSON completos estão em `Validacao/` na raiz do ZIP completo. As capturas de tela dos testes são apenas evidência interna e não foram incluídas no pacote.

## Próximo teste no aparelho

Instale o APK como atualização, feche e reabra o app e selecione a mesma saída HTML. Comece em **Página original**, usado na última comparação, e confira uma letra e uma imagem. Depois teste o modo **16:9 — compatibilidade TV Box**, se necessário. O resultado na box física ainda deve ser confirmado pelo usuário.

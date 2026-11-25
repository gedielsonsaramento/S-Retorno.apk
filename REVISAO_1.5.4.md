> Registro histórico da candidata de 31/10. Para o APK e testes de 08/11, consulte REVISAO_HTML_HF1.md.

# Revisão de 31/10/2026 — Central 0.1.4 e fonte Android 1.5.4

## Estado real da entrega

- Central 0.1.4: ZIP instalável, candidata para teste no Spresenter. Usa o protocolo dos apps 1.5.1–1.5.3; pode ser testada mantendo o APK atual.
- Android 1.5.4: código-fonte candidato, NÃO compilado. Não há APK 1.5.4 nesta entrega.
- Renderização HTML no Android 6: NÃO resolvida nem validada fisicamente nesta revisão.

## O que foi corrigido na Central

Os nomes das fontes no catálogo da 0.1.3 eram elementos `span` sem ação de clique. Agora são botões: clicar abre a escolha da box e já seleciona a fonte. Com mais de uma box, é obrigatório escolher o destino. Ao mudar o destino, a lista inclui também as fontes NDI/HTML informadas por aquele app.

A janela de ação permanece aberta durante o envio e exibe progresso, confirmação ou erro dentro dela. O botão fica bloqueado enquanto aguarda resposta. O cartão preserva a última confirmação. O app precisa confirmar o mesmo identificador de comando; respostas ausentes ou divergentes não são tratadas como sucesso nem provocam reenvio automático.

Uma consulta periódica de status em andamento antes podia recusar um comando com “Aguarde a operação atual”. Agora o comando aguarda essa consulta terminar. “Fonte aceita pelo app” confirma aplicação do comando, não a imagem física da TV. O estado de reprodução continua separado.

## Comparação HTML realizada

Foram abertos os APKs 1.4.3-TVBox, 1.4.10-TVBox e 1.5.3, além do fonte completo 1.5.3. A comparação das instruções DEX (referências resolvidas) mostrou:

- `HtmlStageViewport` da 1.4.10 e da 1.5.3 é idêntico: mesmo enquadramento e escala.
- `HtmlLegacyCompat` da 1.4.10 e da 1.5.3 é idêntico: mesma interceptação e verificação dos recursos.
- Manifesto, JavaScript, CSS e avisos do perfil HTML são idênticos byte a byte entre 1.4.10 e 1.5.3.
- A 1.4.3 não inclui o perfil HTML posterior; não deve ser confundida com toda a série 1.4.
- `HtmlMonitor.ensureRenderer()` da 1.5.3 acrescentou a seleção de camada de software para o modo compatibilidade. A candidata restaura a composição padrão, preservando as opções de densidade e o canvas.

Essa reversão retira uma mudança não validada em hardware, mas NÃO explica a regressão que já foi relatada na 1.5.2. Não foi feita uma troca indiscriminada dos arquivos do Spresenter. O perfil existente só adapta os nomes e hashes conhecidos da captura de 26/10; sem uma captura da saída atualmente servida pelo PC, não foi possível confirmar se ele está sendo aplicado na box.

## Validação desta revisão

- 23 testes Node: aprovados. Incluem ponte, catálogo, dois destinos, clique duplicado, falha/timeout, recibo divergente, comando durante consulta automática, desligamento diário neutro e proteção das credenciais.
- Integração DOM com jsdom: aprovada. Executa HTML/UI e lógica reais com ponte/servidor sintéticos; confere envio HTML e NDI à segunda box sem alterar a primeira e erro visível. Não executa Chromium nem o firmware Android.
- Sintaxe JavaScript: aprovada.
- ZIP do plugin: integridade e presença do manifesto/entradas verificadas no empacotamento.
- Compilação/testes Android: NÃO executados. O wrapper falhou com `UnknownHostException: services.gradle.org`; o SDK Android também não está instalado neste ambiente.
- Chromium: tentativa de instalação indisponível; não há teste de pixels desta revisão.
- Teste no Spresenter real e nas boxes: pendente.

Os relatórios antigos incluídos no fonte são históricos. Não são testes da candidata 1.5.4.

## Compilar em ambiente Android preparado

Na pasta do projeto, com JDK 17, SDK plataforma 36 e acesso às dependências:

```sh
bash gradlew :app:testDebugUnitTest :app:lintDebug :app:assembleTvboxTest -PmonitorPrebuiltNativeDir=../../local-native
```

O fonte mantém as bibliotecas nativas fornecidas pela base 1.5.3. A chave privada não acompanha o pacote. Para atualizar uma instalação existente, a compilação precisa usar o certificado original; não desinstale a box para contornar conflito de assinatura.

## Teste da Central

Instale o ZIP 0.1.4 no mesmo plugin. Conecte o catálogo, clique em Músicos, escolha uma box e confirme. Confira a mensagem na janela, a fonte no cartão e a imagem na TV. Repita com outra box e com NDI quando disponível. Se precisar retornar, reinstale a Central 0.1.3 preservando seu armazenamento.

## O que falta para fechar a correção HTML

É necessária evidência da saída que falha agora: captura HTML com seus JS/CSS atuais e identificação do Android/WebView da box, comparando a mesma fonte na mesma box com uma versão antiga comprovadamente boa. Uma foto do resultado ajuda a distinguir composição comprimida, falta de imagens e repetição de quadros, mas isoladamente não confirma a causa.

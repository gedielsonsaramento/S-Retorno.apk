# Publicação — 1.5.5 Fluidez RC1 / Central 0.1.5

Data: 25/11/2026. Publicação dos pacotes originais da entrega candidata de 10/11/2026.

## Identificação e origem

- App: `S-Retorno-1.5.5-Fluidez-RC1.apk`, versão `1.5.5-fluidez-rc1`, código 23.
- Central: `S-Retorno-Central-0.1.5.zip`, manifesto 0.1.5.
- Projeto: `S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip`, extraído para atualizar o código próprio da main. SDK/bundles gerados continuam fora dos arquivos rastreados conforme `.gitignore`.
- Os pacotes 1.5.1/0.1.1 enviados novamente pelo mantenedor e o projeto anterior 1.5.2/0.1.2 permanecem nos respectivos ramos de downloads.

## Conferência desta publicação

1. CRC dos ZIPs de fonte, plugin e APK: aprovado.
2. SHA-256 do APK corresponde ao registro original `validacao-apk.json`: `35b8fe401da69343be036bdf1dd7e369758be96b4e126d19f901b5cdf274f895`.
3. Certificado contido na assinatura do APK e no APK 1.5.1 recebido: mesmo SHA-256 `6007ea0469cbe58451d689913869fcfd617e6e686967ed8a1e113091eac51421`.
4. Manifesto e quatro arquivos de execução/interface do plugin: idênticos aos fontes recebidos.
5. Três recursos adaptados de JavaScript/CSS do APK: hashes válidos e conteúdo idêntico ao fonte recebido.
6. `npm test` da Central: 24 testes aprovados; zero falhas ou ignorados.
7. Código próprio do projeto atualizado a partir do pacote, com documentação de instalação, compilação, versões e integridade.

A publicação não altera o APK, o ZIP do plugin nem o ZIP de fontes recebidos. Não houve nova compilação Android, execução do SDK NDI real, teste no Spresenter instalado ou validação física das boxes neste trabalho. Os resultados da compilação e testes anteriores estão em [VALIDACAO_1.5.5.md](../../VALIDACAO_1.5.5.md).

A revisão continua candidata. O roteiro de imagem, áudio, rede, reconexão e fluidez deve ser realizado no equipamento do culto antes de tratá-la como homologada.

[Downloads e hashes](../DOWNLOADS.md) · [Mudanças da candidata](../../REVISAO_FLUIDEZ.md).

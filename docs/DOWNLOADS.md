# Downloads — S-Retorno e Central de Retornos

## Mais recente: S-Retorno 1.5.5 Fluidez RC1 / Central 0.1.5

Candidata para testes, publicada no GitHub em 25/11/2026. Os três arquivos são os originais da entrega de 10/11/2026; seus nomes, números de versão e conteúdo foram preservados.

| Conteúdo | Download |
| --- | --- |
| APK Android compilado | [S-Retorno-1.5.5-Fluidez-RC1.apk](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-1.5.5-Fluidez-RC1.apk) |
| Plugin instalável no Spresenter | [S-Retorno-Central-0.1.5.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-Central-0.1.5.zip) |
| Projeto completo em fontes e recursos de compilação | [S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip) |
| Integridade | [SHA256SUMS.txt](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/SHA256SUMS.txt) |
| Avisos dos componentes NDI | [AVISOS_NDI.txt](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/AVISOS_NDI.txt) |
| Código próprio versionado | [ZIP da revisão 1.5.5 Fluidez RC1](https://github.com/gedielsonsaramento/S-Retorno.apk/archive/refs/heads/versao-1.5.5-fluidez-rc1.zip) |

Instale o APK sobre a edição TVBox anterior com o mesmo pacote/certificado. No Spresenter, instale o ZIP específico da Central. O ZIP de fontes é para desenvolvimento. [Instalação e pareamento](../README.md#instalar-e-conectar) · [Manual da Central](../central-retornos/README.md) · [Compilação](COMPILAR_1.5.5.md).

O pacote Android é `br.com.polegar.ndimonitor.tvboxtest`, versão `1.5.5-fluidez-rc1`, código 23. Android 6 permite HTML; NDI continua condicionado a Android 7/API 24 ou superior e runtime compatível. O certificado corresponde ao APK 1.5.1 recebido.

## Validação

Na conferência de publicação, os ZIPs passaram na verificação de integridade; os hashes correspondem aos arquivos preservados; o plugin coincide com seus fontes e seus 24 testes passaram. Os assets HTML do APK correspondem aos fontes e aos hashes do registro. O [registro original](../VALIDACAO_1.5.5.md) descreve a compilação e os testes Android/nativos feitos naquela entrega. Não houve nova compilação ou teste físico nesta publicação.

A candidata ainda exige teste de imagem, áudio, fluidez e reconexão na box e no Spresenter instalados. [Registro desta publicação](historico/PUBLICACAO_1.5.5_RC1_2026-11-25.md).

## SHA-256

| Arquivo | Bytes | SHA-256 |
| --- | ---: | --- |
| S-Retorno-1.5.5-Fluidez-RC1.apk | 11684980 | `35b8fe401da69343be036bdf1dd7e369758be96b4e126d19f901b5cdf274f895` |
| S-Retorno-Central-0.1.5.zip | 22511 | `55e0042915b294e52fbbc630d88e1752f42614e63fe50248c76795376cf2439b` |
| S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip | 5123217 | `0be2e85f459196d6cf40b6fdcbf122a0de93cf4fa8d5929b98452e5f8fc19f83` |

No Windows: `Get-FileHash .\S-Retorno-1.5.5-Fluidez-RC1.apk -Algorithm SHA256`. No Linux: `sha256sum S-Retorno-1.5.5-Fluidez-RC1.apk`.

## Histórico preservado

| Versão | Arquivos |
| --- | --- |
| App 1.5.1 / Central 0.1.1 | [Pacote com APK, plugin e manual](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-1.5.1-Central-pacote.zip) · [Plugin 0.1.1](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-Central-0.1.1.zip) |
| App 1.5.2 / Central 0.1.2 | [Projeto completo com instaladores](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.2/S-Retorno-1.5.2-Projeto-Completo.zip) |
| App 1.4.12 | [Instaladores anteriores](https://github.com/gedielsonsaramento/S-Retorno.apk/tree/downloads-1.4.12) |

O pacote 1.5.1 é o enviado novamente pelo mantenedor em 25/11; não é a revisão mais recente. Os resultados históricos se aplicam às respectivas versões e equipamentos descritos nos documentos.

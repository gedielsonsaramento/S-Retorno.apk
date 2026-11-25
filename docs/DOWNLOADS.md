# Downloads — S-Retorno e Central de Retornos

## Instaladores recebidos: 1.5.1 / Central 0.1.1

| Conteúdo | Download |
| --- | --- |
| Plugin para Spresenter 0.1.1 | [S-Retorno-Central-0.1.1.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-Central-0.1.1.zip) |
| Aplicativo Android 1.5.1, plugin 0.1.1 e manual | [S-Retorno-1.5.1-Central-pacote.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-1.5.1-Central-pacote.zip) |
| Manual da Central 0.1.1 | [MANUAL-DA-CENTRAL.md](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/MANUAL-DA-CENTRAL.md) |
| Lista de integridade | [SHA256SUMS.txt](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/SHA256SUMS.txt) |
| Pasta dos instaladores | [Ramo downloads-1.5.1](https://github.com/gedielsonsaramento/S-Retorno.apk/tree/downloads-1.5.1) |

Os arquivos são os instaladores da **1.5.1 / Central 0.1.1** recebidos para publicação. O ZIP do pacote reúne o APK, o ZIP instalável do plugin e os manuais; ele não contém os fontes exatos da 1.5.1.

## Projeto disponível: Android 1.5.2 / Central 0.1.2

| Conteúdo | Link |
| --- | --- |
| Projeto completo com fontes, APK 1.5.2, Central 0.1.2 e manuais | [S-Retorno-1.5.2-Projeto-Completo.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.2/S-Retorno-1.5.2-Projeto-Completo.zip) |
| Código-fonte, testes e documentação | [Baixar ZIP do projeto na main](https://github.com/gedielsonsaramento/S-Retorno.apk/archive/refs/heads/main.zip) |
| Fontes do aplicativo Android | [app/](../app/) |
| Fontes, testes e empacotador da Central | [central-retornos/](../central-retornos/) |
| Instruções de compilação | [COMPILAR_1.5.2.md](COMPILAR_1.5.2.md) |

O código da main corresponde à revisão posterior **Android 1.5.2 / Central 0.1.2**, e não aos instaladores 1.5.1 / 0.1.1 acima. O GitHub gera o ZIP com o nome do repositório e do ramo.

O projeto completo **1.5.2 / Central 0.1.2** contém as pastas **Instaladores/** e **Fontes/**, além de **LEIA-ME.md**, **VALIDACAO.json** e **VERSOES.json**. Seus instaladores são da 1.5.2 / 0.1.2, não da 1.5.1 / 0.1.1. Siga seu **LEIA-ME.md** e mantenha os componentes desse pacote juntos.

O ZIP do código contém o código próprio e as instruções de compilação. APKs, bibliotecas do SDK NDI, chaves de assinatura, credenciais e capturas privadas não fazem parte desse ZIP. Siga os guias para preparar as dependências e recursos HTML necessários à compilação.

## Instalar ou atualizar

1. Baixe **S-Retorno-1.5.1-Central-pacote.zip** e extraia o conteúdo para obter **S-Retorno-1.5.1.apk**, **S-Retorno-Central-0.1.1.zip** e o manual.
2. Copie o APK para a TV/box, por exemplo em um pendrive.
3. Abra o arquivo no aparelho e autorize a instalação por esse gerenciador, se o Android solicitar.
4. Para atualizar uma instalação compatível com o mesmo pacote e assinatura, instale por cima para preservar as configurações. Se já usa uma versão superior à 1.5.1, confira a versão antes de instalar.
5. No Spresenter, abra **Configurações → Plugins → Instalar (.zip/pasta)** e selecione **S-Retorno-Central-0.1.1.zip**. Não selecione o ZIP do pacote completo.
6. Siga o [manual da Central 0.1.1](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/MANUAL-DA-CENTRAL.md) para parear os aparelhos e escolher uma fonte.

Android 6 usa HTML; Android 7 ou superior pode usar HTML e NDI conforme o aparelho/runtime. Mantenha o PC e o aparelho na mesma rede local. A publicação desses arquivos não equivale a uma nova validação de imagem, áudio ou comandos nos aparelhos físicos.

O APK 1.5.1 está dentro do pacote de instaladores; não há link separado para esse APK. Para o projeto 1.5.2, use as instruções do **LEIA-ME.md** incluído nele.

## Integridade dos arquivos recebidos

| Arquivo | Tamanho em bytes | SHA-256 |
| --- | ---: | --- |
| `S-Retorno-1.5.1.apk` | 15.877.564 | `ad61f3c1a7e9511d246949308d1e8ce5c041f9d952250ad5505a8eb0743d0a64` |
| `S-Retorno-Central-0.1.1.zip` | 19.064 | `fe2fa0e2aff2205ed8c83e7991bbab0d96223d6d2698fe0f82b1007912412f0b` |
| `S-Retorno-1.5.1-Central-pacote.zip` | 5.730.591 | `fc0c0e4271fe9f6ea3f3789b7ec5a2698bfe2374a605915ea9be57441e4f6238` |
| `S-Retorno-1.5.2-Projeto-Completo.zip` | 12.202.147 | `f9aeeec6106b82bde9ddb21bb1df4de3c822d6226700b7e253091400bea823fe` |

No Windows, confira um arquivo com `Get-FileHash .\S-Retorno-1.5.1.apk -Algorithm SHA256`. No Linux, use `sha256sum S-Retorno-1.5.1.apk`.

## Histórico

- [Instalador 1.4.12 e arquivos preservados](https://github.com/gedielsonsaramento/S-Retorno.apk/tree/downloads-1.4.12)
- [Histórico de alterações](CHANGELOG.md)
- [Registros anteriores de validação](historico/README.md)

Os resultados de testes e relatos de funcionamento do histórico se aplicam às versões e datas registradas. Eles não confirmam a homologação física desta distribuição.

# S-Retorno

![S-Retorno — Monitor de palco para NDI e HTML](artwork/s-retorno-social.png)

Use sua TV, TV Box ou celular Android como monitor de retorno para igrejas e eventos. O S-Retorno recebe fontes **NDI** e exibe saídas **HTML do Spresenter** pela rede local.

## Downloads

| Conteúdo | Download |
| --- | --- |
| Aplicativo Android **1.5.1** + plugin **0.1.1** + manual | [Baixar pacote de instaladores](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-1.5.1-Central-pacote.zip) |
| Plugin para Spresenter **0.1.1** | [Baixar Central de Retornos](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-Central-0.1.1.zip) |
| Projeto completo **1.5.2 / Central 0.1.2**, com fontes e instaladores | [Baixar projeto completo](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.2/S-Retorno-1.5.2-Projeto-Completo.zip) |
| Projeto Android **1.5.2** + fontes da Central **0.1.2** | [Baixar código-fonte, testes e documentação — ZIP](https://github.com/gedielsonsaramento/S-Retorno.apk/archive/refs/heads/main.zip) |

O primeiro pacote reúne os arquivos recebidos da **1.5.1 / Central 0.1.1**. O projeto completo é da revisão posterior **1.5.2 / Central 0.1.2** e inclui os instaladores dessa própria revisão. O pacote recebido da 1.5.1 não contém seus fontes exatos. [Versões, integridade e detalhes dos downloads](docs/DOWNLOADS.md).

## Instalar e conectar

1. Baixe **S-Retorno-1.5.1-Central-pacote.zip** e extraia o conteúdo. Dentro dele estão **S-Retorno-1.5.1.apk**, o ZIP instalável da Central e o manual.
2. Abra o APK no aparelho Android. Na TV/box, você pode copiá-lo para um pendrive. Autorize a instalação pelo gerenciador de arquivos se o Android solicitar.
3. Para atualizar uma instalação compatível com o mesmo pacote e assinatura, instale por cima para preservar as configurações. Se já usa uma versão superior à 1.5.1, confira a versão antes de instalar. O projeto completo 1.5.2 tem instruções próprias em seu **LEIA-ME.md**; mantenha app e plugin do mesmo pacote.
4. No Spresenter, abra **Configurações → Plugins → Instalar (.zip/pasta)** e selecione **S-Retorno-Central-0.1.1.zip**. Use o ZIP do plugin, não o ZIP do pacote completo.
5. Na TV/box, abra **Engrenagem → Central de Retornos → Gerar código de pareamento**. No plugin, escolha **Vincular retorno** e informe o endereço e o código mostrados na TV.
6. Em **Fontes do Spresenter**, cole o link de **Editor remoto (rede) → Copiar link com token**. Depois, use **Escolher fonte** no cartão do aparelho.

[Manual da Central 0.1.1](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/MANUAL-DA-CENTRAL.md).

## Compatibilidade

| Versão do aparelho | Modos disponíveis |
| --- | --- |
| Android 6 | HTML |
| Android 7 ou superior | HTML e NDI, conforme aparelho/runtime |

Mantenha o aparelho e o computador com o Spresenter ou transmissor NDI na mesma rede, por Wi-Fi ou cabo. Na Central, aparelhos desligados ficam como **Sem comunicação**, sem criar uma falha automática apenas por esse motivo.

## Código-fonte e documentação

O projeto publicado contém o aplicativo Android **1.5.2**, o módulo **central-retornos/** da Central **0.1.2**, testes e documentação. O ZIP do código não inclui o APK nem substitui o pacote de instaladores. Para compilar o aplicativo, siga os requisitos de SDK NDI e recursos HTML descritos nos guias.

- [Compilação da revisão 1.5.2](docs/COMPILAR_1.5.2.md)
- [Documentação e guias de uso](docs/README.md)
- [Histórico de alterações](docs/CHANGELOG.md)
- [Registros anteriores de validação](docs/historico/README.md)
- [Relatar um problema](https://github.com/gedielsonsaramento/S-Retorno.apk/issues)

Esta publicação disponibiliza os arquivos recebidos e os fontes existentes; não representa nova validação nos aparelhos. Os relatos antigos de funcionamento nas boxes e na TV Philips se aplicam às versões e datas registradas em cada documento.

Projeto independente. Código próprio sob [licença MIT](LICENSE). NDI® é marca registrada da Vizrt NDI AB; os componentes NDI têm [termos e avisos próprios](docs/LICENCA_NDI_IMPORTANTE.md).

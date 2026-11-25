# S-Retorno 1.5.4 — candidato em código-fonte, sem APK

Esta entrega contém a Central 0.1.4 empacotada e uma alteração Android candidata.
Leia **REVISAO_1.5.4.md** antes de compilar. A correção visual do HTML no Android 6 ainda não está confirmada.

A compilação Android não foi executada: o ambiente não dispõe do SDK e não conseguiu baixar o Gradle. Os testes Android do histórico pertencem às versões anteriores.

---
## Documentação herdada da base 1.5.3

# S-Retorno 1.5.3

![S-Retorno — Monitor de palco para NDI e HTML](artwork/s-retorno-social.png)

Use sua TV, TV Box ou celular Android como monitor de retorno para igrejas e eventos. O S-Retorno recebe fontes **NDI** e exibe saídas **HTML do Spresenter** pela rede local.


> **Revisão para teste nos aparelhos:** app **1.5.3** com **Central de Retornos 0.1.3**. Corrige os botões de vínculo/catálogo da Central, mantém a busca pública disponível com cadastros antigos e faz o X encerrar o app. Inclui renderização por software no modo de compatibilidade TV Box, ainda sujeita à validação no aparelho.

## Arquivos desta entrega

- **S-Retorno-1.5.3.apk**: aplicativo pronto para instalar.
- **S-Retorno-Central-0.1.3.zip**: plugin instalável no Spresenter, compatível com o app 1.5.3.
- **Fontes/S-Retorno-1.5.3/**: projeto Android e fontes do plugin no pacote completo.

Permite controlar fontes e acompanhar memória, CPU, rede e ocorrências pelo Spresenter. **Desligar as TVs e boxes após os cultos não gera relatório de erro.** Ao religar, o app restaura a fonte salva e a central retoma o vínculo. [Instalação e uso](central-retornos/README.md).

O pacote desta revisão inclui APK, plugin, fontes e instruções. Os testes automatizados e a compilação estão registrados em [Validação 1.5.3](docs/historico/VALIDACAO_1.5.3.md). O teste físico no Spresenter e nas boxes continua necessário.

## Compatibilidade

| Versão do aparelho | Modos disponíveis |
| --- | --- |
| **Android 6** | **HTML** |
| **Android 7 ou superior** | **HTML e NDI** |

Mantenha o aparelho e o computador com o Spresenter ou transmissor NDI na **mesma rede**, por Wi-Fi ou cabo.

## Como instalar

1. Extraia o pacote da revisão e localize **S-Retorno-1.5.3.apk**.
2. No celular, abra o arquivo baixado. Para TV/box, você pode copiá-lo para um pendrive e abrir pelo gerenciador de arquivos.
3. Se o Android solicitar, permita a instalação por esse navegador ou gerenciador de arquivos.
4. Toque em **Instalar** e abra **S-Retorno**.

**Para atualizar as edições TVBox anteriores, instale por cima, sem desinstalar**, para manter as fontes e configurações salvas.

## Como configurar as fontes HTML

Faça esta configuração em cada TV ou box, uma vez para cada PC com Spresenter. O app mantém até **oito computadores**, cada um com sua própria conexão:

1. No S-Retorno, selecione **HTML** e abra **engrenagem → Saídas HTML do Spresenter → Configurar pelo celular ou PC**.
2. Deixe essa tela aberta: ela mostra um **endereço** e um **código de seis dígitos**.
3. No computador com o Spresenter, abra **Editor remoto (rede)** e use **Copiar link com token**.
4. No navegador do PC ou celular da mesma rede, abra o **endereço mostrado na TV/box**. Informe o código e cole o link completo copiado do Spresenter.
5. Toque em **Enviar para esta TV**. Volte à lista do app e selecione a saída desejada.

O código vale por cinco minutos. Se expirar, abra novamente **Configurar pelo celular ou PC** para gerar outro.

Ao cadastrar outro PC, os anteriores são mantidos. Para remover somente um computador, use **Remover** ao lado do endereço nas configurações das saídas HTML.

[Passo a passo completo para encontrar o link no Spresenter](docs/SAIDAS_SPRESENTER.md).

## Como buscar novas fontes HTML

1. Para iniciar uma busca sem preencher link ou chave, abra **engrenagem → Saídas HTML do Spresenter → Buscar PCs e saídas automaticamente**.
2. Crie ou habilite a nova **Saída HTML** no Spresenter.
3. No app, abra o painel de fontes, mantenha **HTML** selecionado e toque em **↻ no topo do painel**.
4. Aguarde a lista atualizar e selecione a fonte que deseja exibir.

Com os computadores cadastrados, a busca consulta os catálogos de todos eles e atualiza seus nomes. Se mudar também o endereço de uma saída, selecione a nova entrada na lista.

Para procurar endereços padrão em outra faixa local, abra **engrenagem → Saídas HTML do Spresenter → Buscar em outra faixa de IP** e informe, por exemplo, **192.168.2**. A rede precisa permitir a comunicação com essa faixa. Para nomes personalizados e todas as saídas de um PC, cadastre seu link do Editor remoto.

O app salva a fonte escolhida e a abre novamente na próxima inicialização. Para abrir um link HTML diretamente, use **Informar endereço** e cole o endereço completo da saída.

## Vincular a Central e sair do app

Na Central 0.1.3, conecte primeiro o catálogo em **Fontes do Spresenter** pelo link local do Editor remoto. Ao abrir **Vincular retorno**, a busca usa automaticamente a faixa desse PC (ou do endereço LAN da janela do Spresenter). Se o Spresenter abrir a janela por localhost e não houver catálogo, use **Outra faixa de IP**. O SDK atual não fornece as placas de rede do Windows ao plugin; não é possível identificar essa faixa sem um endereço local de referência.

Na box, gere o código em **Central de Retornos** e mantenha a janela aberta. Escolha o app encontrado no plugin, informe o nome e o código, e toque em **Vincular**.

O **X** no topo da lista agora encerra o aplicativo e interrompe a reprodução. Para somente recolher a lista e continuar assistindo, use **Voltar**. A fonte e o início automático configurado são preservados.

Se a imagem deixar letras repetidas na box, selecione **engrenagem → Exibição HTML → Monitor 16:9 — compatibilidade TV Box**. Esta opção passa a usar renderização por software para contornar problemas de composição antigos. Pode consumir mais CPU e prejudicar vídeo em aparelhos lentos; as letras, imagens e vídeos precisam ser conferidos na box do relato.

## Como usar NDI

Em aparelhos com **Android 7 ou superior**, deixe o transmissor NDI ativo no computador, selecione **NDI** no app, toque em **↻** para procurar fontes e escolha a desejada.

## Ocorrências e métricas na Central

Consulte as métricas e ocorrências na **Central de Retornos** do Spresenter. Os atalhos de diagnóstico e relatório saíram da interface da TV/box. O registro interno continua disponível para o painel após o pareamento.

A recuperação de abertura mostra as ações de tentar novamente, abrir HTML e acessar as configurações do Android. [Escopo da interface](docs/INTERFACE_CENTRAL.md).

## Testes e atualizações semanais

**Realizamos testes e disponibilizamos novas atualizações toda semana** para melhorar o funcionamento, a compatibilidade e a estabilidade do aplicativo.

A validação física desta revisão está pendente; os resultados anteriores por aparelho ficam no histórico. [Ver o registro dos testes](docs/TESTES_EM_APARELHOS.md).

Se encontrar uma dificuldade, consulte a ocorrência no painel e [relate o problema aqui](https://github.com/gedielsonsaramento/S-Retorno.apk/issues), indicando a versão e o que aconteceu.

<details>
<summary>Código-fonte e documentação técnica</summary>

- O código-fonte da 1.5.3 acompanha o pacote completo, incluindo o módulo `central-retornos/`.
- [Recompilar usando as bibliotecas do APK](docs/COMPILAR_1.5.3.md)
- [Documentação completa e instruções de compilação](docs/README.md)
- [Detalhes do download e integridade do APK](docs/DOWNLOADS.md)
- [Histórico de alterações](docs/CHANGELOG.md)
- [Registros de validação](docs/historico/README.md)

</details>

Projeto independente. Código próprio sob [licença MIT](LICENSE). NDI® é marca registrada da Vizrt NDI AB; os componentes NDI têm [termos e avisos próprios](docs/LICENCA_NDI_IMPORTANTE.md).

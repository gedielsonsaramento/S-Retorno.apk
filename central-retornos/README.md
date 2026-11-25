# Central de Retornos 0.1.5 — candidata para teste

Correção sobre a 0.1.3. Compatível com o protocolo dos apps S-Retorno 1.5.1–1.5.3; não exige o APK candidato 1.5.4.

## Instalar e escolher uma fonte

1. Mantenha o app atual na box. Esta entrega não contém APK novo.
2. No Spresenter, atualize o mesmo plugin com **S-Retorno-Central-0.1.5.zip**. Os vínculos continuam no mesmo armazenamento.
3. Abra **Fontes do Spresenter** e conecte o catálogo pelo link local com token do Editor remoto, caso ainda não esteja configurado.
4. Clique no nome da fonte, como **Músicos**, selecione a box e confirme. Com várias boxes, o destino precisa ser escolhido explicitamente.
5. A janela permanece aberta e informa a resposta. **Fonte aceita pelo app** confirma o comando; o cartão acompanha separadamente **HTML carregando**, **HTML carregado** ou o estado NDI. HTML carregado não comprova a composição visual da TV.

Também continua disponível **Escolher fonte** no cartão, para fontes HTML/NDI conhecidas ou endereço/nome manual.

Correções: catálogo clicável, feedback dentro da janela de ação, bloqueio de clique duplicado enquanto o pedido aguarda resposta e espera da consulta automática antes de enviar o comando. Comandos sem confirmação não são reenviados automaticamente.

Validação desta revisão: 23 testes Node aprovados. Não testado no Spresenter instalado nem na box física. Os relatórios antigos de navegador/Android não são validação desta revisão.

## Vincular uma box

1. Na TV, abra **Engrenagem → Central de Retornos → Gerar código de pareamento**. Deixe a janela aberta.
2. No plugin, clique em **Vincular retorno**, dê um nome (por exemplo, “Músicos”), informe o endereço mostrado na TV e os seis números do código.
3. Clique em **Vincular**. A janela mostra a tentativa e informa a resposta ou o erro. Após o app responder, ele aparecerá no painel. Feche a janela de pareamento na TV para continuar o retorno.

O código vale por cinco minutos, aceita até cinco tentativas incorretas e deixa de valer ao fechar a janela. Um novo pareamento bem-sucedido substitui o controlador anterior. O vínculo é salvo com proteção do Android; se o firmware não oferecer o armazenamento seguro necessário, a TV avisa que o vínculo vale somente para aquela sessão.

O gerenciamento vem desativado. Depois de autorizado, volta a funcionar quando o app abre e para ao sair do primeiro plano. O fluxo de áudio/vídeo continua independente do plugin.

## Configurar as saídas HTML uma vez no PC

1. No Spresenter, copie **Editor remoto (rede) → Copiar link com token**.
2. No plugin, expanda **Fontes do Spresenter**, cole o link local completo e clique em **Conectar catálogo HTML**.
3. Em cada cartão, use **Escolher fonte** e selecione a saída desejada.

O plugin consulta o catálogo a cada minuto e envia suas saídas HTML habilitadas aos aparelhos pareados. O token de API fica no armazenamento privado do plugin; não é distribuído às boxes. O último catálogo recebido e a fonte escolhida ficam salvos no app. A central reconhece o mesmo formato de catálogo utilizado pelo S-Retorno anterior; precisa ser validada com a versão do Spresenter instalada no PC.

Esta versão limita o catálogo distribuído a 48 saídas e ao tamanho do pedido. Catálogos maiores podem ser reduzidos para respeitar o limite. Também é possível informar diretamente um endereço HTML completo ou selecionar/informar o nome exato de uma fonte NDI disponível.

## Busca e endereços

Na janela de vinculação, informe uma faixa como **192.168.1** e clique em **Localizar**. A busca é manual, limitada a 254 endereços dessa faixa e seis consultas simultâneas. Consulta somente a identificação do serviço na porta **48762**, sem enviar credenciais. As boxes precisam ter o gerenciamento local ativado; a busca não ativa aplicativos fechados. O pareamento inicial continua exigindo o código mostrado em cada aparelho.

Para conservar o endereço, faça uma **reserva DHCP no roteador**. A central não muda o IP configurado no Android. Se o endereço mudar, use **Detalhes e manutenção → Atualizar endereço**; o plugin verifica a identidade antes de salvar o novo endereço. A descoberta entre sub-redes, IPv6 e alteração automática do roteador não estão implementadas.

## O que o painel mede

| Indicador | Significado |
|---|---|
| App responde | Uma consulta autenticada recebeu resposta recente. Depois de três consultas sem resposta ou 20 segundos sem comunicação, o cartão informa “Sem comunicação”. Essa ausência é neutra e não gera relatório de erro. |
| Resposta do app | Tempo de ida e volta da consulta, incluindo o processamento no app. Não é ping ICMP nem a latência completa do vídeo. |
| Variação entre respostas | Diferença entre dois tempos de resposta consecutivos; não é uma medição de perda de pacotes. |
| Memória / CPU | PSS e CPU normalizada do processo principal. Não inclui toda a box nem garante incluir os subprocessos do WebView. |
| Recepção / envio | Diferença dos contadores atribuídos ao app pelo Android, convertida em Mbps. Contadores não disponíveis aparecem como “—”. |
| HTML carregado | O carregamento principal terminou. Não comprova que a página continue atualizando letras, áudio ou vídeo. |
| Captura NDI medida | Taxa observada de quadros capturados; é distinta do FPS informado no formato da fonte. |
| Descartes / fila NDI | Contadores do receptor. Descartes indicam quadros não retirados da fila a tempo; não comprovam perda de pacotes na rede. |

As métricas são amostradas a cada cinco segundos enquanto o gerenciamento está ativo e o app permanece no primeiro plano. O plugin mantém até 60 amostras por vínculo em memória, para gráficos. Ao reabrir o processo do plugin, os gráficos começam novamente. A disponibilidade do serviço de rede do plugin e dos contadores depende do software/firmware e deve ser testada nos aparelhos.

## Desligamento após os cultos

TVs e boxes podem ser desligadas diariamente, inclusive retirando a energia. O plugin apresentará **Sem comunicação**, sem somar uma falha ativa nem produzir um relatório de erro por esse motivo. Sem uma resposta, o plugin não consegue distinguir aparelho desligado de perda de rede; por isso utiliza esse estado neutro.

Ao ligar novamente, a central reutiliza a identidade e a credencial salvas e retoma as consultas. Os gráficos começam um novo trecho ao detectar a reabertura do app ou um intervalo sem comunicação, evitando comparar consumo e tempos de resposta de sessões diferentes. A fonte salva continua sendo restaurada pelo app, independentemente do plugin. O vínculo depende do suporte de armazenamento seguro do aparelho, conforme o aviso de pareamento.

Durante a partida, o PC ou transmissor pode ainda estar desligado. **Aguardando fonte HTML** e **NDI aguardando vídeo** não entram no contador de falhas ativas nem no histórico de erros. Um problema real de autenticação/configuração, um motor indisponível, uma falha confirmada pelo Android ou um relato manual continuam visíveis.

## Manutenção e relatos

**Detalhes e manutenção** permite identificar a tela, buscar fontes, recarregar o HTML, reconectar o NDI, limpar o cache de recursos HTML e renomear o retorno. Limpeza e reconexão exigem uma confirmação no painel porque interrompem brevemente a reprodução. A limpeza preserva fontes, preferências e pareamento; não apaga dados de outros aplicativos.

O painel só informa “Comando confirmado” após receber o identificador e a confirmação do app. Isso confirma a aplicação do comando, não o sucesso final do vídeo. Se a resposta se perder, informa resultado sem confirmação e não repete a ação automaticamente. O app retém até 32 confirmações por sessão para rejeitar repetições e alterações do mesmo comando.

Na 1.5.2, os atalhos de diagnóstico e relato foram retirados da TV/box. Os registros anteriores continuam disponíveis na Central. O app guarda até 24 ocorrências, sem mensagem livre ou logs completos. Há registros de falha Java, falha confirmada do motor HTML, falha de inicialização do receptor NDI e manutenção. A ausência de uma fonte HTML/NDI fica apenas no estado atual da reprodução. No Android 11 ou superior, o histórico do sistema pode confirmar falhas nativas/ANR. Em versões antigas, um marcador de sessão incompleta não gera relatório automático: pode representar o desligamento normal da igreja. Relatos manuais e falhas Java confirmadas continuam disponíveis.

Não inclui reinício completo da box, limpeza geral do Android, controle de outros apps nem quiosque gerenciado. Essas ações têm requisitos diferentes de permissões e firmware.

## Acesso e dados

- O serviço escuta somente em um endereço IPv4 de Wi-Fi/Ethernet e não abre portas no roteador. Use uma rede local confiável: esta primeira versão usa HTTP local, sem criptografia do tráfego. Não exponha a porta 48762 à internet.
- Após o pareamento, as consultas e os comandos exigem uma credencial aleatória exclusiva da box. Não há credencial administrativa fixa embutida no APK.
- Nomes, endereços e fontes são usados no gerenciamento local. Não são incorporados ao envio remoto de suporte.
- Esta versão mantém o endereço de suporte remoto vazio: não envia relatórios à internet. Parear a central local não ativa o compartilhamento remoto.
- Para revogar, use **Desativar e desvincular** na TV. **Remover vínculo do PC** remove apenas o registro daquele plugin; a credencial na TV continua até a revogação ou novo pareamento.

## Desenvolver

O código do plugin fica em `src/`; não usa bibliotecas externas em tempo de execução. O envelope de comunicação da interface segue o SDK oficial do Spresenter (`__spresenter: true, data`). Chamadas de rede usam `spresenter.net.httpRequest`; não usam `fetch` no processo de lógica.

```sh
npm test
python3 scripts/package.py
```

O empacotador cria `manifest.json` e `dist/` na raiz do ZIP instalável. Fontes oficiais: [arquitetura](https://github.com/sonext-software/spresenter-plugin/blob/master/docs/architecture.md), [permissões](https://github.com/sonext-software/spresenter-plugin/blob/master/docs/permissions.md) e [instalação](https://github.com/sonext-software/spresenter-plugin/blob/master/docs/packaging.md).

## Verificações da 0.1.2 (histórico)

A interface aceita o envelope oficial do SDK inclusive quando o relay nativo não preenche `MessageEvent.source`. Mostra progresso imediato, confirmação de recebimento pela lógica e erro quando a lógica não responde. As mensagens de pareamento também aparecem dentro da janela modal.

`npm test` verifica lógica e ponte de interface. `tests/browser-roundtrip.cjs` executa a interface em Chromium com um servidor Java real de `LanControlServer`, incluindo código inválido, varredura de 254 endereços, pareamento, catálogo, comandos e desligamento/reconexão. Requer Playwright, classes Android compiladas, JDK 17, um JAR de `org.json` e as variáveis `JAVA_HOME`, `CHROME_BIN`, `MONITOR_JSON_JAR` e `MONITOR_BROWSER_WORK`. O teste não substitui a execução dentro do Spresenter instalado na igreja.


## Fluidez no S-Retorno 1.5.5

Os detalhes NDI mostram captura, envio de quadros ao Android, quadros substituídos antes do desenho, maior tempo de desenho da última janela e fila/falhas de áudio. O envio ao Android não mede a imagem efetivamente exibida pelo monitor nem latência ponta a ponta. As novas métricas ficam sem valor em versões antigas do app. Quadros substituídos pelo app e descartados pelo SDK são contadores diferentes.

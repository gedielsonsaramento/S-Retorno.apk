# Validação — S-Retorno 1.5.3 + Central 0.1.3

Data: 31/10/2026. Revisão candidata para teste na box e no Spresenter da igreja.

## Resultado

- 294 testes Android aprovados, sem falhas, erros ou ignorados; novos cenários incluem APIs 23/25/35.
- 17 testes do plugin aprovados.
- Compilação Android TVBox concluída (código 21, pacote br.com.polegar.ndimonitor.tvboxtest).
- Lint: zero erros, zero falhas fatais e dez avisos existentes.
- Certificado idêntico ao APK 1.5.2. As quatro bibliotecas nativas NDI/JNI permanecem idênticas.
- Recursos de compatibilidade do HTML conferidos por hash dentro do APK.

## Vínculo e catálogo

Foi reproduzida a falha da 0.1.2 em um iframe com sandbox=allow-scripts: o navegador bloqueava a submissão de formulário antes do tratamento do plugin. O teste antigo em uma página sem essa restrição não cobria o ambiente relevante. A 0.1.3 usa cliques diretos pela ponte SDK e verifica os campos antes de enviar. Enter também funciona sem submissão.

A interface real da 0.1.3 passou em Chromium com iframe isolado e um LanControlServer Java real em loopback: campos vazios sem envio, código inválido e válido, busca de 254 endereços, catálogo antes do pareamento, confirmação de comandos, cancelamento de manutenção, escolha NDI, layouts largo/estreito e desligamento/reconexão. Não houve erro de console. A reprodução NDI e as métricas desse servidor de teste são simuladas; não é um Spresenter instalado nem uma box física.

A busca automática inicia ao abrir Vincular retorno e usa o IP LAN da janela ou do PC no catálogo. O IP atual da janela tem prioridade sobre um catálogo antigo. Não presume uma rede padrão: na janela aberta por localhost sem catálogo, solicita um link local de referência ou a faixa manual. O SDK consultado só oferece HTTP/WebSocket e não lista as interfaces do Windows. A faixa é limitada ao /24 do endereço utilizado, seis consultas simultâneas e identificação pública sem credenciais.

## Busca Android e saída

Buscar PCs e saídas automaticamente e Adicionar PC com link vazio iniciam a varredura sem apagar a fonte escolhida. Uma resposta 401 do catálogo não bloqueia a descoberta pública no mesmo PC. Os testes verificam que essas sondagens não recebem tokens. Os nomes personalizados de todas as saídas continuam dependentes do catálogo autorizado ou do catálogo enviado pela Central.

O X termina a tarefa, libera o renderer ao sair e conserva a seleção para a próxima abertura. Voltar recolhe a lista. Quando o S-Retorno é a tela inicial padrão, o fechamento tenta abrir uma tela inicial de outro aplicativo; se houver várias, usa o seletor, e se nenhuma estiver disponível, abre as configurações da tela inicial. O comportamento de firmware quiosque precisa de validação no aparelho.

## Exibição HTML: limite da validação

O modo compatibilidade TV Box agora usa View.LAYER_TYPE_SOFTWARE somente no WebView, para contornar falhas de composição/escala acelerada que podem produzir letras repetidas em firmware antigo. Os modos padrão e Página original mantêm o backend normal. Android 6/7 já selecionavam o modo compatibilidade por padrão, salvo preferência anterior do usuário. A mudança não modifica a saída nem o tema do Spresenter.

A suíte verifica criação/descarte/reabertura do renderer, manutenção da fonte e possibilidade de voltar ao modo normal. A captura adaptada passou no teste JSDOM com APIs modernas ausentes e no layout de Chromium, inclusive atualizações de letra/elemento por WebSocket. Isso não executa o driver da box, não comprova que esse driver causou a foto e não valida reprodução de vídeo nessa box. A renderização por software pode consumir mais CPU e reduzir desempenho de vídeo. A disposição das letras e todas as mídias precisam de teste físico antes de considerar o problema encerrado.

## Roteiro na igreja

1. Instalar S-Retorno-1.5.3.apk sobre a versão anterior, sem desinstalar. Atualizar o plugin com S-Retorno-Central-0.1.3.zip.
2. Na Central, Fontes do Spresenter: colar o link local completo do Editor remoto e Conectar catálogo HTML. Conferir as saídas.
3. Na box, Central de Retornos: gerar código e manter a janela aberta. No plugin, Vincular retorno: conferir a faixa identificada, selecionar a box, informar nome e código. Aguardar Retorno pareado e App responde.
4. Na box, Saídas HTML do Spresenter: Buscar PCs e saídas automaticamente. Repetir com cadastros antigos e após trocar de rede.
5. Exibição HTML: Monitor 16:9 — compatibilidade TV Box. Testar letras, relógio, imagens, vídeo e áudio da mesma fonte da foto, incluindo mudanças de slide.
6. Apertar X: o app deve sair e parar áudio/vídeo. Abrir de novo e conferir a fonte salva. Voltar deve apenas esconder a lista.
7. Desligar e religar após o culto: Sem comunicação permanece neutro e a fonte é restaurada.

## Fontes técnicas consultadas

- [Ponte e isolamento de UI do SDK oficial](https://github.com/sonext-software/spresenter-plugin/blob/master/docs/ui-bridge.md).
- [Arquitetura do SDK oficial](https://github.com/sonext-software/spresenter-plugin/blob/master/docs/architecture.md).
- [Isolamento de formulários em iframe](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox).
- [Renderização por software como compatibilidade](https://developer.android.com/develop/ui/views/graphics/hardware-accel).

## Identidade

- S-Retorno-1.5.3.apk: 16142415 bytes; SHA-256 `c75e29ea0e49c3f69dc138dbeff5962e470051311e9355dedeef8ae598673567`.
- S-Retorno-Central-0.1.3.zip: 21529 bytes; SHA-256 `8696b2097f6bc05f33ad3048b46433d5be7863684351eb204e35c44655e22a67`.
- Certificado SHA-256: `6007ea0469cbe58451d689913869fcfd617e6e686967ed8a1e113091eac51421`.

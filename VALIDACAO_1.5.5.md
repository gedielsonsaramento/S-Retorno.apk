# Validação — S-Retorno 1.5.5 Fluidez RC1

Compilação completa de Java e C++/JNI concluída com Gradle 8.13 e AGP 8.13.2.
O APK usa o SDK NDI real para ARM32 e ARM64. Não houve reaproveitamento do receptor
nativo antigo. O compilador, recursos, assets e tarefas de empacotamento concluíram
com `BUILD SUCCESSFUL`.

## Testes executados

| Conjunto | Resultado |
| --- | --- |
| HtmlMonitorTest | 12 testes aprovados |
| HtmlStageViewportTest | 6 testes aprovados |
| MainActivityModeTest | 19 testes aprovados |
| PcmPlaybackTest | 4 testes aprovados |
| PlaybackStatsTest | 1 testes aprovados |
| Central de Retornos | 24 testes aprovados |
| Fila nativa de vídeo | Quadro mais recente, fila limitada, desenhador bloqueado, cancelamento e liberação de memória aprovados |
| Descoberta NDI nativa | Regressões aprovadas |
| Android Lint | 0 erros, 10 avisos |

Os testes HTML e de ciclo de vida incluem APIs simuladas 23, 25 e 35. Verificam
geometria 16:9, área lógica 720p, densidade, manutenção da URL, pausa/retomada e
troca de modo. Não são testes de renderização no WebView ou firmware da box real.
Os avisos do Lint são sobre orientação, backup, layout, recursos sem uso, autofill
e textos na interface. Não bloqueiam a geração do APK.

## Instalador

- Pacote: `br.com.polegar.ndimonitor.tvboxtest`.
- Versão: `1.5.5-fluidez-rc1`, código 23.
- Android mínimo: API 23 (Android 6) para HTML; NDI permanece condicionado a API 24+.
- Assinatura v1/v2 verificada, com o mesmo certificado da versão 1.5.4 HF1.
- ZIP íntegro e alinhamento do APK verificado; as duas bibliotecas ARM64 possuem segmentos de 16 KiB.
- Assets conferidos byte a byte contra os fontes, incluindo as correções HTML do HF1.
- Novas assinaturas JNI e recepção NDI real confirmadas nas bibliotecas do APK.
- SHA-256: `35b8fe401da69343be036bdf1dd7e369758be96b4e126d19f901b5cdf274f895`.

## Teste na box

1. Instale o APK como atualização. A assinatura foi preservada; não é necessário
   desinstalar a versão de teste anterior com o mesmo pacote/certificado.
2. Em HTML, escolha **Configurações → Exibição HTML → Monitor 16:9 — leve (720p)**.
   Confira letras, imagens, vídeo e áudio; compare com o modo anterior.
3. Em NDI, confira movimento, áudio e reconexão à última fonte. O controle das
   filas já fica ativo; a Central 0.1.5 mostra as novas métricas nos detalhes.

Ainda não foi possível validar fluidez, sincronismo audiovisual, temperatura,
Wi-Fi, HDMI ou decodificação nos aparelhos físicos. Não há sincronização de
relógios entre boxes. A correção controla filas locais e adiciona uma opção HTML
mais leve; não garante eliminar todos os engasgos em qualquer equipamento.

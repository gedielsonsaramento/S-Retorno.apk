# S-Retorno 1.5.5 — Fluidez RC1

Revisão candidata para reduzir engasgos em NDI e HTML. `versionCode=23`,
`versionName=1.5.5-fluidez-rc1`, pacote de teste `br.com.polegar.ndimonitor.tvboxtest`.

## NDI

- Recepção e desenho em threads separadas. Uma única imagem pode aguardar o desenho;
  ao chegar outra, a mais antiga que ainda não foi desenhada é liberada pelo SDK.
- As imagens já entregues ao desenhador continuam válidas até o fim da cópia.
  O receptor só é destruído depois de liberar todas as imagens retidas.
- O acesso à Surface não segura a trava da interface durante o desenho.
- A geometria do buffer só é configurada ao trocar de superfície ou resolução.
- A ligação JNI da thread de captura é mantida até a thread terminar.
- Taxas de captura e envio à tela são medidas separadamente. Também são contados
  os quadros substituídos pelo app e o maior tempo de desenho da última janela.

## Áudio NDI

- Escrita em uma thread própria; escritas parciais mantêm o restante das amostras.
- Fila de espera limitada a 120 ms; áudio antigo é descartado em sobrecarga.
  Existe também o buffer interno do Android, que não está incluído nessa medida.
- Interrupção, troca de fonte e fechamento limpam a fila e interrompem a escrita.
- Falhas do dispositivo de áudio permitem uma tentativa posterior sem encerrar
  a recepção do vídeo. Não há sincronização de relógios entre aparelhos.

## HTML

- Nova opção: Configurações → Exibição HTML → Monitor 16:9 — leve (720p).
- Essa opção usa uma área lógica de 1280 × 720, densidade 1× e mantém a proporção.
  Pode reduzir nitidez em comparação com 1080p. As escolhas anteriores são preservadas.
- JavaScript/CSS do HF1 e aceleração normal do WebView são preservados.
  Não são alterados os relógios, transições ou comandos de mídia do Spresenter.

## Central 0.1.5

Os detalhes NDI mostram as novas métricas. As versões antigas do app continuam
aceitas; campos indisponíveis aparecem sem valor. A política de considerar
neutro o desligamento diário das TVs continua em vigor.

## Compilação

Recompilar Java e C++ com o SDK NDI real para ARM32 e ARM64. O projeto rejeita
`monitorPrebuiltNativeDir`: bibliotecas antigas não contêm esta correção.
Android SDK 36, NDK 28.2.13676358, CMake 3.22.1, Gradle 8.13, JDK 17 ou 21.
HTML permite API 23; NDI continua condicionado a API 24 ou superior.

## Limites da validação

Os testes automatizados verificam filas, ciclo de vida e geometria. Não comprovam
fluidez, som, desempenho térmico ou latência nas boxes reais. O APK candidato
precisa ser testado com a fonte, rede e monitor usados no culto. Esta revisão não
promete eliminar limitações do decodificador, do Wi-Fi ou do firmware.

As medidas de desenho representam entrega ao Android, não confirmação do quadro
físico na tela. Quadros substituídos e quadros perdidos pelo SDK não devem ser somados
como se medissem a mesma etapa.

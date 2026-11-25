# S-Retorno

![S-Retorno — Monitor de palco para NDI e HTML](artwork/s-retorno-social.png)

Use sua TV, TV Box ou celular Android como monitor de retorno para igrejas e eventos. O app recebe fontes **NDI** e exibe saídas **HTML do Spresenter** pela rede local. A **Central de Retornos** é o plugin que gerencia os aparelhos pelo Spresenter.

## Versão mais recente: 1.5.5 Fluidez RC1 + Central 0.1.5

**Candidata para testes nos aparelhos.** Publicada no GitHub em 25/11/2026. O APK está compilado; a fluidez e a reprodução na box ainda precisam ser conferidas em campo.

| O que baixar | Download direto |
| --- | --- |
| Aplicativo Android **1.5.5 Fluidez RC1** | [⬇️ S-Retorno-1.5.5-Fluidez-RC1.apk](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-1.5.5-Fluidez-RC1.apk) |
| Plugin do Spresenter **Central 0.1.5** | [⬇️ S-Retorno-Central-0.1.5.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-Central-0.1.5.zip) |
| Projeto completo em fontes, com recursos de compilação | [⬇️ S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip) |

[Detalhes, versões anteriores e integridade dos arquivos](docs/DOWNLOADS.md).

## Instalar e conectar

1. Baixe o **APK** e abra no Android. Na TV/box, você pode copiá-lo para um pendrive e abrir pelo gerenciador de arquivos.
2. Para atualizar a edição TVBox com o mesmo pacote e certificado, **instale por cima, sem desinstalar**, para conservar as fontes e configurações. O APK desta entrega mantém o certificado da 1.5.1.
3. No Spresenter, abra **Configurações → Plugins → Instalar (.zip/pasta)** e selecione **S-Retorno-Central-0.1.5.zip**.
4. Na TV/box, abra **Engrenagem → Central de Retornos → Gerar código de pareamento**. Mantenha essa janela aberta.
5. No plugin, use **Vincular retorno**, selecione ou informe o endereço da box e digite o código mostrado nela.
6. Em **Fontes do Spresenter**, cole o link de **Editor remoto (rede) → Copiar link com token** e conecte o catálogo.
7. No cartão da box, use **Escolher fonte**. Também é possível clicar numa saída do catálogo, escolher o aparelho e confirmar. A janela mostra o andamento e o resultado do envio.

[Manual da Central](central-retornos/README.md). A confirmação do comando indica que o app aceitou a fonte; confira também a imagem na TV.

## Compatibilidade

| Aparelho | Modos disponíveis |
| --- | --- |
| Android 6 | HTML |
| Android 7 ou superior | HTML e NDI, conforme aparelho/runtime |

Mantenha o PC e o aparelho na mesma rede, por cabo ou Wi-Fi. TVs e boxes desligadas após o culto ficam como **Sem comunicação**, sem gerar falha automática apenas por esse motivo.

## HTML e NDI nesta revisão

- **HTML:** preserva os perfis de compatibilidade da correção HF1 e acrescenta **Exibição HTML → Monitor 16:9 — leve (720p)**. A opção reduz a resolução lógica e pode reduzir a nitidez.
- **NDI:** limita a fila de vídeo e separa recepção, desenho e escrita de áudio para evitar acúmulo de quadros em sobrecarga.
- **Central:** mostra métricas distintas de captura, envio à tela, quadros substituídos, tempo de desenho e fila de áudio.

Para procurar novas fontes, abra a lista no app e use **↻**. Para listar saídas HTML com nomes personalizados, configure o catálogo do PC ou use o catálogo enviado pela Central.

[Alterações e limites da candidata](REVISAO_FLUIDEZ.md) · [Validação original do APK](VALIDACAO_1.5.5.md) · [Conferência desta publicação](docs/historico/PUBLICACAO_1.5.5_RC1_2026-11-25.md).

## Versões anteriores

- [S-Retorno 1.5.1 + Central 0.1.1 e manual — pacote enviado pelo mantenedor](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.1/S-Retorno-1.5.1-Central-pacote.zip).
- [Projeto completo 1.5.2 + Central 0.1.2](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.2/S-Retorno-1.5.2-Projeto-Completo.zip).

<details>
<summary>Código-fonte e documentação</summary>

- [Código próprio desta revisão — ZIP do GitHub](https://github.com/gedielsonsaramento/S-Retorno.apk/archive/refs/heads/versao-1.5.5-fluidez-rc1.zip).
- [Compilar a revisão 1.5.5](docs/COMPILAR_1.5.5.md).
- [Documentação e guias](docs/README.md).
- [Histórico de alterações](docs/CHANGELOG.md).
- [Relatar um problema](https://github.com/gedielsonsaramento/S-Retorno.apk/issues).

O pacote completo de fontes acima inclui os recursos desta entrega. Para compilar o ZIP automático do GitHub, prepare também o SDK NDI e os perfis HTML conforme o guia. A revisão exige recompilar Java e C++/JNI juntos.

</details>

Projeto independente. Código próprio sob [licença MIT](LICENSE). NDI® é marca registrada da Vizrt NDI AB; seus componentes têm [termos e avisos próprios](docs/LICENCA_NDI_IMPORTANTE.md).

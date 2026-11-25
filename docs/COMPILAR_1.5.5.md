# Compilar S-Retorno 1.5.5 Fluidez RC1

O [pacote completo de fontes](https://github.com/gedielsonsaramento/S-Retorno.apk/raw/refs/heads/downloads-1.5.5-fluidez-rc1/S-Retorno-1.5.5-Fluidez-RC1-Fontes.zip) contém o projeto e os recursos usados nesta entrega. O código versionado na main/no ramo da revisão é o mesmo código próprio; o SDK NDI e os bundles HTML gerados ficam fora do ZIP automático do GitHub, conforme `.gitignore`.

## Aplicativo Android

Use JDK 17 ou 21, Gradle 8.13, SDK Android 36, NDK 28.2.13676358 e CMake 3.22.1. Abra no Android Studio a pasta com `settings.gradle` e selecione `tvboxTest`.

No Windows:

```powershell
.\gradlew.bat :app:assembleTvboxTest
```

No Linux/macOS:

```sh
bash gradlew :app:assembleTvboxTest
```

O APK é gerado em `app/build/outputs/apk/tvboxTest/`. Recompilar C++/JNI junto com Java é obrigatório: `monitorPrebuiltNativeDir` é rejeitado porque o receptor nativo antigo não contém as filas desta revisão.

Para uma cópia obtida somente do GitHub, instale seu SDK NDI Android em `app/src/main/cpp/include/` e `app/src/main/jniLibs/`, seus avisos em `app/src/main/assets/libndi_licenses.txt`, e prepare os assets `app/src/main/assets/html-compat/` conforme [tools/html-compat](../tools/html-compat/README.md). O pacote completo preservado já contém esses recursos.

O APK distribuído mantém o certificado original. Uma compilação local precisa da chave original para atualizar uma instalação existente sem desinstalar. Chaves privadas não acompanham a entrega.

## Central 0.1.5

```sh
cd central-retornos
npm test
python3 scripts/package.py
```

O plugin é gerado em `central-retornos/release/S-Retorno-Central-0.1.5.zip`. `npm test` executa 24 testes com o Node.js. Para o teste DOM separado, instale as dependências de desenvolvimento e execute `npm run test:dom`.

[Alterações e limites](../REVISAO_FLUIDEZ.md) · [Registro original de validação](../VALIDACAO_1.5.5.md).

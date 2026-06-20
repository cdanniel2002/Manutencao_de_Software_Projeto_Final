@echo off
cd /d "%~dp0"
echo ============================================
echo   FinanSee - Instalador e Inicializador
echo ============================================

rem Se argumentos foram passados, repassa direto ao setup.py (ex: start.bat --run)
if not "%~1"=="" (
    python setup.py %*
    goto :fim
)

echo.
echo   [1] Instalar tudo e executar o projeto
echo   [2] Apenas executar o projeto (ja instalado)
echo.
choice /C 12 /N /M "Escolha uma opcao [1 ou 2]: "
if errorlevel 2 (
    python setup.py --run
) else (
    python setup.py
)

:fim
if errorlevel 1 (
    echo.
    echo Algo deu errado. Verifique as mensagens acima.
    pause
)

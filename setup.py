"""
FinanSee - Script de instalação e execução automatizado.

Uso:
    python setup.py           # instala tudo e roda backend + frontend
    python setup.py --install # apenas instala dependências (não roda os servidores)
    python setup.py --run     # apenas roda os servidores (assume já instalado)
"""

import os
import sys
import shutil
import subprocess
import platform
import venv
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BACKEND_DIR = ROOT / "backend"
FRONTEND_DIR = ROOT / "Front" / "sage"
VENV_DIR = BACKEND_DIR / ".venv"
ENV_EXAMPLE = BACKEND_DIR / ".env.example"
ENV_FILE = BACKEND_DIR / ".env"
REQUIREMENTS = BACKEND_DIR / "requirements" / "development.txt"
MANAGE_PY = BACKEND_DIR / "core" / "manage.py"

IS_WINDOWS = platform.system() == "Windows"

GTK3_WINGET_ID = "tschoonj.GTKForWindows"
GTK3_DEFAULT_PATHS = [
    Path(r"C:\Program Files\GTK3-Runtime Win64\bin"),
    Path(r"C:\Program Files (x86)\GTK3-Runtime Win64\bin"),
]


def log(msg, kind="info"):
    prefixes = {"info": "[INFO]", "ok": "[OK]  ", "warn": "[WARN]", "err": "[ERR] ", "step": "\n==>"}
    print(f"{prefixes.get(kind, '[INFO]')} {msg}", flush=True)


def venv_python():
    if IS_WINDOWS:
        return VENV_DIR / "Scripts" / "python.exe"
    return VENV_DIR / "bin" / "python"


def run(cmd, cwd=None, check=True, shell=False):
    log(f"$ {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    result = subprocess.run(cmd, cwd=cwd, shell=shell)
    if check and result.returncode != 0:
        log(f"Comando falhou (exit {result.returncode}).", "err")
        sys.exit(result.returncode)
    return result


def check_prereqs():
    log("Verificando pré-requisitos...", "step")
    if sys.version_info < (3, 9):
        log("Python 3.9+ é necessário.", "err")
        sys.exit(1)
    log(f"Python {platform.python_version()} OK", "ok")

    npm = shutil.which("npm")
    node = shutil.which("node")
    if not npm or not node:
        log("Node.js / npm não encontrados no PATH. Instale em https://nodejs.org/", "err")
        sys.exit(1)
    log("Node.js / npm OK", "ok")


def find_gtk3_bin():
    for p in GTK3_DEFAULT_PATHS:
        if (p / "libgobject-2.0-0.dll").exists():
            return p
    return None


def ensure_gtk3():
    """Garante que o GTK3 Runtime está disponível (necessário para WeasyPrint)."""
    if not IS_WINDOWS:
        return
    log("Verificando GTK3 Runtime (necessário para WeasyPrint)...", "step")
    gtk_bin = find_gtk3_bin()
    if gtk_bin:
        log(f"GTK3 encontrado em {gtk_bin}", "ok")
    else:
        if not shutil.which("winget"):
            log("GTK3 não encontrado e winget não está disponível.", "err")
            log("Instale manualmente: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases", "err")
            sys.exit(1)
        log("GTK3 não encontrado. Instalando via winget (pode pedir UAC)...")
        run([
            "winget", "install", "--id", GTK3_WINGET_ID, "-e",
            "--accept-package-agreements", "--accept-source-agreements",
        ])
        gtk_bin = find_gtk3_bin()
        if not gtk_bin:
            log("Instalação concluída mas o diretório GTK3 não foi localizado. Reinicie o terminal e rode novamente.", "err")
            sys.exit(1)
        log(f"GTK3 instalado em {gtk_bin}", "ok")

    current_path = os.environ.get("PATH", "")
    if str(gtk_bin) not in current_path:
        os.environ["PATH"] = f"{gtk_bin}{os.pathsep}{current_path}"


def create_venv():
    log("Configurando ambiente virtual Python...", "step")
    if VENV_DIR.exists() and venv_python().exists():
        log(".venv já existe", "ok")
        return
    log(f"Criando .venv em {VENV_DIR}")
    venv.create(VENV_DIR, with_pip=True)
    log(".venv criado", "ok")


def collect_requirements(path: Path, seen=None):
    """Lê requirements.txt seguindo includes `-r outro.txt` recursivamente."""
    if seen is None:
        seen = set()
    path = path.resolve()
    if path in seen:
        return []
    seen.add(path)
    result = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("-r "):
            ref = (path.parent / line[3:].strip()).resolve()
            result.extend(collect_requirements(ref, seen))
            continue
        if "#" in line:
            line = line.split("#", 1)[0].strip()
        if line:
            result.append(line)
    return result


def install_python_deps():
    log("Instalando dependências Python...", "step")
    py = str(venv_python())
    run([py, "-m", "pip", "install", "--upgrade", "pip"])

    packages = collect_requirements(REQUIREMENTS)
    if IS_WINDOWS:
        packages = [
            "psycopg[binary]==3.2.1" if p.lower().startswith("psycopg[c]") else p
            for p in packages
        ]

    tmp_req = BACKEND_DIR / ".requirements.combined.txt"
    tmp_req.write_text("\n".join(packages) + "\n", encoding="utf-8")
    try:
        run([py, "-m", "pip", "install", "-r", str(tmp_req)])
    finally:
        try:
            tmp_req.unlink()
        except FileNotFoundError:
            pass
    log("Dependências Python instaladas", "ok")


def setup_env_file():
    log("Configurando arquivo .env...", "step")
    if ENV_FILE.exists():
        log(".env já existe, mantendo o atual", "ok")
        return
    if not ENV_EXAMPLE.exists():
        log(".env.example não encontrado, pulando", "warn")
        return
    shutil.copy(ENV_EXAMPLE, ENV_FILE)
    log(f".env criado a partir de .env.example", "ok")
    log("Lembrete: ajuste a SECRET_KEY e demais variáveis no backend/.env", "warn")


def run_migrations():
    log("Rodando migrations do Django...", "step")
    py = str(venv_python())
    manage = str(MANAGE_PY)
    run([py, manage, "makemigrations"], cwd=BACKEND_DIR / "core")
    run([py, manage, "migrate"], cwd=BACKEND_DIR / "core")
    log("Migrations aplicadas", "ok")


def install_frontend_deps():
    log("Instalando dependências do frontend (npm)...", "step")
    npm_cmd = "npm.cmd" if IS_WINDOWS else "npm"
    lock = FRONTEND_DIR / "package-lock.json"
    cmd = [npm_cmd, "ci"] if lock.exists() else [npm_cmd, "install"]
    run(cmd, cwd=FRONTEND_DIR)
    log("Dependências frontend instaladas", "ok")


def start_servers():
    if IS_WINDOWS:
        gtk_bin = find_gtk3_bin()
        if gtk_bin and str(gtk_bin) not in os.environ.get("PATH", ""):
            os.environ["PATH"] = f"{gtk_bin}{os.pathsep}{os.environ.get('PATH', '')}"

    log("Subindo backend e frontend...", "step")
    py = str(venv_python())
    npm_cmd = "npm.cmd" if IS_WINDOWS else "npm"

    backend_proc = subprocess.Popen(
        [py, str(MANAGE_PY), "runserver"],
        cwd=BACKEND_DIR / "core",
    )
    log(f"Backend Django iniciado (PID {backend_proc.pid}) -> http://localhost:8000", "ok")

    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=FRONTEND_DIR,
        shell=IS_WINDOWS,
    )
    log(f"Frontend Next.js iniciado (PID {frontend_proc.pid}) -> http://localhost:3000", "ok")

    log("Pressione Ctrl+C para encerrar ambos os servidores.\n", "info")
    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        log("Encerrando servidores...", "step")
        for proc in (frontend_proc, backend_proc):
            try:
                proc.terminate()
                proc.wait(timeout=10)
            except Exception:
                proc.kill()
        log("Servidores encerrados.", "ok")


def install_all():
    check_prereqs()
    create_venv()
    install_python_deps()
    ensure_gtk3()
    setup_env_file()
    run_migrations()
    install_frontend_deps()
    log("Instalação concluída!", "ok")


def main():
    args = sys.argv[1:]
    only_install = "--install" in args
    only_run = "--run" in args

    if only_run:
        start_servers()
        return

    install_all()

    if only_install:
        log("Use 'python setup.py --run' para iniciar os servidores.", "info")
        return

    start_servers()


if __name__ == "__main__":
    main()

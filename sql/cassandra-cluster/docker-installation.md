----Open_powershell_AS_admin----

1) Install WSL 2:
    - wsl --install
    - wsl --set-default-version 2

2) Enable WSL and Virtual Machine Platform Features:
    - dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    - dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart


3) Install a Linux Distribution:
    - https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package

*After Running These Commands:
    - You will need to restart your computer for the changes to take effect.

5) Download Docker Desktop:
    -https://www.docker.com/products/docker-desktop/

6) Install Docker Desktop:

7) Verify Installation:
    - docker --version
    - docker run hello-world






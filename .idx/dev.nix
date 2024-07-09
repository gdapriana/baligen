{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_18
    pkgs.yarn
    pkgs.openssl.dev
  ];

  # Sets environment variables in the workspace
  env = {
    SOME_ENV_VAR = "hello";
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "angular.ng-template"
    "bradlc.vscode-tailwindcss"
    "DavidAnson.vscode-markdownlint"
    "dbaeumer.vscode-eslint"
    "dsznajder.es7-react-js-snippets"
    "ecmel.vscode-html-css"
    "EditorConfig.EditorConfig"
    "formulahendry.auto-close-tag"
    "formulahendry.auto-rename-tag"
    "GitHub.github-vscode-theme"
    "mikestead.dotenv"
    "oderwat.indent-rainbow"
    "Prisma.prisma"
    "Prisma.prisma-insider"
    "ritwickdey.LiveServer"
    "waderyan.gitblame"
    "xabikos.JavaScriptSnippets"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = false;
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}
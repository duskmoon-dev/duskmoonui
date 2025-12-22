{ pkgs, lib, config, inputs, ... }:

let
  pkgs-stable = import inputs.nixpkgs-stable { system = pkgs.stdenv.system; };
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
in
{
  env.GREET = "Duskmoon UI";
  env.NODE_ENV = "development";

  packages = [
    # Core tools
    pkgs-stable.git
    pkgs-stable.figlet
    pkgs-stable.lolcat

    # JavaScript/TypeScript ecosystem
    pkgs-stable.bun
    pkgs-stable.nodePackages.typescript

    # Code quality and formatting
    pkgs-stable.nodePackages.prettier
    pkgs-stable.oxlint

    # Additional useful tools
    pkgs-stable.curl  # For API testing and downloads
    pkgs-stable.jq    # For JSON processing in scripts
  ];

  languages.javascript.enable = true;
  languages.javascript.bun.enable = true;
  languages.javascript.bun.package = pkgs-stable.bun;

  scripts.hello.exec = ''
    figlet -w 120 $GREET | lolcat
  '';

  enterShell = ''
    # Add local node_modules binaries to PATH (for astro, etc.)
    export PATH="$PWD/node_modules/.bin:$PATH"

    hello
    echo ""
    echo "🚀 Duskmoon UI Development Environment"
    echo "📦 Available commands:"
    echo "  bun run dev        - Start development server"
    echo "  bun run dev:core   - Start development server"
    echo "  bun run build      - Build for production"
    echo "  bun run build:core - Build for production"
    echo "  bun run build:docs - Build for production"
    echo "  bun run preview    - Run preview"
    echo ""
  '';

}


{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell rec {
  name = "p5";
  nativeBuildInputs = with pkgs; [
    nodePackages.nodejs
    vscode-langservers-extracted
    emmet-ls
    typescript-language-server
    taplo
    yaml-language-server
    markdown-oxide
    prettierd
    eslint
    mdformat
  ];

  shellHook = ''
    echo "${name} nix-shell activated: $(which npm)"
  '';
}

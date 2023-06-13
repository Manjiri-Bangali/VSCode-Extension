# mtg README

A test generator utility that leverages power of OpenAI to generate unit tests (with jest framework) for React components; while providing a seamless integration for developers at the same time.

## Features

This VSCode Extension has OpenAI logic integrated into it for generating unit tests for React components using jest and enzyme.
The OpenAI logic will only work on source code files(.ts or .js framework) in the current scope. For rest of the files, it’ll print an error saying “Requesting unit tests for an invalid file. Please select a valid file”.

You can engage with the extension in two ways:

1. RIght click on the file in the file explorer. This'll open the context-menu, and you can select the `Generate Unit Tests` option out of it.
2. Secondly, when in the source file. You can hit CMD+SHIFT+P to open up `Command Palette`, and then type out `Generate Unit Tests`.

Using both ways, the extension will generate a unit test file for the corrosponsing component within the same directory

**Enjoy!**

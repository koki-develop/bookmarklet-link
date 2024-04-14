import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import copy from 'copy-to-clipboard';

const initialCode = `
(function () {
  alert('Hello, world!');
})();
`.trim();

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CodeEditorModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  readonly #sanitizer = inject(DomSanitizer);

  readonly code = signal<string>(initialCode);

  readonly codeModel: CodeModel = {
    language: 'javascript',
    value: initialCode,
    uri: 'index.js',
  };

  readonly editorTheme = 'vs-dark';

  readonly editorOptions = {
    contextmenu: false,
    minimap: {
      enabled: false,
    },
  };

  readonly bookmarklet = computed(() => {
    const code = this.code();
    return `javascript:${encodeURIComponent(code)}`;
  });

  readonly sanitizedBookmarklet = computed(() => {
    const bookmarklet = this.bookmarklet();
    return this.#sanitizer.bypassSecurityTrustUrl(bookmarklet);
  });

  copyToClipboard() {
    copy(this.bookmarklet());
  }
}

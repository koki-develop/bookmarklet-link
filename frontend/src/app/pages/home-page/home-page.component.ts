import { Component, computed, inject, signal } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import copy from 'copy-to-clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCopy, tablerLink } from '@ng-icons/tabler-icons';
import { BookmarkletService } from '../../bookmarklet.service';

const initialCode = `
(function () {
  alert('Hello, world!');
})();
`.trim();

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CodeEditorModule, NgIconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  viewProviders: [provideIcons({ tablerCopy, tablerLink })],
})
export class HomePageComponent {
  readonly #bookmarkletService = inject(BookmarkletService);

  readonly name = 'Bookmarklet';

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

  readonly code = signal<string>(initialCode);

  readonly bookmarklet = computed(() => {
    const code = this.code();
    return this.#bookmarkletService.toBookmarklet(code);
  });

  readonly sanitizedBookmarklet = computed(() => {
    const bookmarklet = this.bookmarklet();
    return this.#bookmarkletService.sanitize(bookmarklet);
  });

  copyToClipboard(value: string) {
    copy(value);
  }
}

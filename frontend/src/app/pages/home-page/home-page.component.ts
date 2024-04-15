import { Component, computed, inject, signal } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import copy from 'copy-to-clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerCopy,
  tablerLink,
  tablerPlayerPlay,
  tablerArrowNarrowUp,
} from '@ng-icons/tabler-icons';
import { BookmarkletService } from '../../bookmarklet.service';
import { FormsModule } from '@angular/forms';

const initialCode = `
(function() {
  alert('Hello, world!');
})();
`.trim();

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CodeEditorModule, FormsModule, NgIconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  viewProviders: [
    provideIcons({
      tablerArrowNarrowUp,
      tablerCopy,
      tablerLink,
      tablerPlayerPlay,
    }),
  ],
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

  runCode() {
    const code = this.code();
    this.#bookmarkletService.run(code);
  }

  copyToClipboard(value: string) {
    copy(value);
  }
}

import { Component, inject, signal } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import copy from 'copy-to-clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerCopy,
  tablerLink,
  tablerPlayerPlay,
  tablerArrowNarrowUp,
} from '@ng-icons/tabler-icons';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { BookmarkletPipe } from '../../pipes/bookmarklet.pipe';

const initialCode = `
(function() {
  alert('Hello, world!');
})();
`.trim();

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    // modules
    CodeEditorModule,
    FormsModule,
    // components
    NgIconComponent,
    // pipes
    BookmarkletPipe,
    SafeUrlPipe,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [BookmarkletPipe],
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
  readonly #bookmarkletPipe = inject(BookmarkletPipe);

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

  runCode() {
    const code = this.code();
    eval(code);
  }

  copyToClipboard() {
    const bookmarklet = this.#bookmarkletPipe.transform(this.code());
    copy(bookmarklet);
  }
}

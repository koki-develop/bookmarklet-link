import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowBigUp,
  tablerCopy,
  tablerLink,
  tablerPlayerPlay,
} from '@ng-icons/tabler-icons';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { PreviewComponent } from './components/preview/preview.component';

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
    PreviewComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  viewProviders: [
    provideIcons({
      arrowUp: tablerArrowBigUp,
      copy: tablerCopy,
      link: tablerLink,
      play: tablerPlayerPlay,
    }),
  ],
})
export class HomePageComponent {
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
}

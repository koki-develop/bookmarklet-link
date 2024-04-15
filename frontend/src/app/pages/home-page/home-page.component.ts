import { Component, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowBigUp, tablerPlayerPlay } from '@ng-icons/tabler-icons';
import { EditorComponent } from './components/editor/editor.component';
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
    // components
    EditorComponent,
    NgIconComponent,
    PreviewComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  viewProviders: [
    provideIcons({
      arrowUp: tablerArrowBigUp,
      play: tablerPlayerPlay,
    }),
  ],
})
export class HomePageComponent {
  readonly name = signal<string>('Bookmarklet');
  readonly code = signal<string>(initialCode);

  run(code: string) {
    eval(code);
  }
}

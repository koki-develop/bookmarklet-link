import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule, CodeEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
  readonly name = input.required<string>();
  readonly code = input.required<string>();

  @Output() nameChanged = new EventEmitter<string>();
  @Output() codeChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.codeModel.value = this.code();
  }

  readonly codeModel: CodeModel = {
    language: 'javascript',
    value: '',
    uri: 'index.js',
  };

  readonly editorTheme = 'vs-dark';

  readonly editorOptions = {
    contextmenu: false,
    minimap: {
      enabled: false,
    },
  };

  nameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.nameChanged.emit(target.value);
  }
}

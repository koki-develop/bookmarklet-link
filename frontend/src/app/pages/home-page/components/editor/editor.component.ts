import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { editor } from 'monaco-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CodeEditorModule],
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

  readonly editorOptions: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
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

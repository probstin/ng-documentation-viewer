import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DocsBusService, EventType } from '../../services/docs-bus.service';

const defaultFilePath = 'assets/welcome.md';

@Component({
  selector: 'app-doc-viewer',
  template: `
  <div class="p-4 border-1 border-round surface-border surface-ground">
    <markdown [src]="filePath"></markdown>
  </div>
  `,
})
export class DocViewerComponent implements OnInit {

  docBusSub!: Subscription;
  filePath: string = defaultFilePath;

  constructor(private docBusService: DocsBusService) { }

  ngOnInit(): void {
    this.docBusSub = this.docBusService.on(EventType.DOC_SELECTED, (node: TreeNode) => {
      this.filePath = node.data || defaultFilePath;
    });
  }

}

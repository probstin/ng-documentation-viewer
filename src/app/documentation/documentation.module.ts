import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { TreeModule } from 'primeng/tree';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';

@NgModule({
  declarations: [
    DocViewerComponent,
    DocumentationComponent
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    HttpClientModule,
    TreeModule,
    MarkdownModule.forChild()
  ]
})
export class DocumentationModule { }

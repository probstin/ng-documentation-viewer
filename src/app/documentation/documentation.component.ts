import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { filter, map, Observable, tap } from 'rxjs';
import { DocsBusService, EventData, EventType } from './services/docs-bus.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements OnInit {

  selectedNode!: TreeNode;
  treeNodes$!: Observable<TreeNode[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private docBusService: DocsBusService
  ) { }

  ngOnInit(): void {
    this.treeNodes$ = this.http
      .get<TreeNode>('assets/docs-menu.json')
      .pipe(
        map(treeNode => treeNode.data),
        tap(treeNodeData => this.selectedNode = findNode(this._getActiveSegment(this.router, this.router.url), treeNodeData)),
      );
  }

  nodeSelect(event: any): void {
    const node = event.node;
    // if it's a leaf node, meaning it's got a filePath
    if (node.leaf && node.data) {
      const routerLink = `${node.parent.parent.key}/${node.parent.key}/${node.key}`;
      this.router.navigate([routerLink], { relativeTo: this.route });
      this.docBusService.emit(new EventData(EventType.DOC_SELECTED, node));
    }
    // otherwise, we can just expand the node
    else {
      node.expanded = !node.expanded;
    }
  }

  private _getActiveSegment(router: Router, url: string): string {
    const tree: UrlTree = router.parseUrl(url);
    const segmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const segments: UrlSegment[] = segmentGroup.segments;
    segments.shift();
    const urlSegment = segments.map(({ path }) => path).pop()
    return urlSegment;
  }

}

function findNode(urlSegment: string, nodes: TreeNode[]) {
  return nodes.reduce((a, item) => {
    if (a) return a;
    if (item.key === urlSegment) return item;
    if (item.children) return findNode(urlSegment, item.children);
  }, null);
}

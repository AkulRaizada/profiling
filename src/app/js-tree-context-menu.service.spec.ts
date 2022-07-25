import { TestBed } from '@angular/core/testing';

import { JsTreeContextMenuService } from './js-tree-context-menu.service';

describe('JsTreeContextMenuService', () => {
  let service: JsTreeContextMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsTreeContextMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

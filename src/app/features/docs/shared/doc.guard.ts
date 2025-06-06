import { CanDeactivateFn } from '@angular/router';
import { DocUploadComponent } from '../doc-upload/doc-upload.component';

export const docGuard: CanDeactivateFn<DocUploadComponent> = (component: DocUploadComponent, currentRoute, currentState, nextState) => {
  return component.canExit();
};

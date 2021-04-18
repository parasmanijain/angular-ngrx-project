import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { autoLogout } from '../../auth/state/auth.actions';
import { isAuthenticated } from '../../auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isAuthenticated:Observable<boolean>;

    constructor(private store:Store<AppState>) {
    }

    ngOnInit(): void {
      this.isAuthenticated = this.store.select(isAuthenticated);
    }

    onLogout(event:Event) {
      event.preventDefault();
      this.store.dispatch(autoLogout())
    }
}

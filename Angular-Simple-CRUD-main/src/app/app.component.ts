import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
               
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link btn btn-primary mr-2" routerLink="/add-user">Add User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-secondary" routerLink="/display-users">Display Users</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterModule]
})
export class AppComponent {
    title = 'CrudStandaloneApp';
}


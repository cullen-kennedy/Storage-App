import { Component } from "@angular/core"
import { Router } from "@angular/router";
import { UserService } from '../shared/services/user.service';

@Component({
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"]
})

export class Login {
    constructor(private data: UserService, private router: Router) { }

    errorMessage: string = "";
    public creds = {
        email: "",
        pass: ""
    };

    onLogin() {
        console.log(this.creds)
        this.data.login(this.creds)
            .subscribe(success => {
                if (success) {
                    console.log("success")
                        this.router.navigate([""]);
                } else {
                        this.router.navigate(["login"]);
                }
            }, err => this.errorMessage = "Failed to log in")
    }
}
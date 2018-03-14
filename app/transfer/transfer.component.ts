import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

const regexPattern = "^[0-9]*";

@Component({
  selector: "ns-app-transfer",
  moduleId: module.id,
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer-common.css"]
})
export class TransferComponent implements OnInit {
  showSucces = false;

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl("", [
        Validators.pattern(regexPattern),
        Validators.required
      ]),
      description: new FormControl("", Validators.required),
      origin: new FormControl("", [
        Validators.pattern(regexPattern),
        Validators.required
      ]),
      destination: new FormControl("", [
        Validators.pattern(regexPattern),
        Validators.required
      ])
    });
  }
}

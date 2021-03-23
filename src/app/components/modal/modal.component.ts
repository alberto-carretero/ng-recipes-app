import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() buttons: any[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async closeModal(button: any) {
    await this.modalController.dismiss({
      dismissed: button.action,
    });
  }
}

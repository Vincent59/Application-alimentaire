import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  constructor(private modalController: ModalController) { }

  @Input() public ingredients: string;
  public choseIngredients = [];

  ngOnInit() {
  }

  closeModal() {
    for(let i=0; i < document.querySelectorAll(".active").length; i++)
    {
      console.log(document.querySelectorAll(".active"));
      this.choseIngredients.push({
        "name": document.querySelectorAll(".active")[i].innerHTML,
        "unite": document.querySelectorAll(".active")[i].getAttribute("data-unite")
        });
        console.log(this.choseIngredients)
    }

    this.modalController.dismiss(this.choseIngredients);
  }

  choseIngredient() {
    
    if((<HTMLLIElement>event.target).classList.contains("active"))
    {
      (<HTMLLIElement>event.target).classList.remove("active");
    }
    else
    {
      (<HTMLLIElement>event.target).className += " active";
    }
  }

}

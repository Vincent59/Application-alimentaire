import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  @Input() ingredientsToShow;
  @Input() ingredients;

  constructor(private modalController: ModalController) { }

  public choseIngredients = [];
  public isItemActive = [];

  ngOnInit() {
    if (this.ingredientsToShow.length > 0) {
      for (let ingToShow of this.ingredientsToShow){
        for (let ing of this.ingredients) {
          if (ingToShow.id === ing.id){
            this.isItemActive.push({
              id: ingToShow.id,
              qte: ingToShow.qte
            });
          }
        }
      }
    }
  }

  /**
   * Close the modal without sending data
   */
  closeModalWithoutUpdate() {
    this.modalController.dismiss(this.choseIngredients);
  }

  /**
   * Close the modal and send the selected items
   */
  closeModal() {
    for(let i=0; i < document.querySelectorAll(".active").length; i++)
    {
      this.choseIngredients.push({
        "id": +document.querySelectorAll(".active")[i].getAttribute("data-id"),
        "name": document.querySelectorAll(".active")[i].innerHTML,
        "unite": document.querySelectorAll(".active")[i].getAttribute("data-unite"),
        "qte": this.getQteOrNull(+document.querySelectorAll(".active")[i].getAttribute("data-id"))
        });
    }
    this.modalController.dismiss(this.choseIngredients);
  }

  chooseIngredient() {
    
    if((<HTMLLIElement>event.target).classList.contains("active"))
    {
      (<HTMLLIElement>event.target).classList.remove("active");
    }
    else
    {
      (<HTMLLIElement>event.target).className += " active";
    }
  }

  /**
   * Check if the item was selected before
   * @param id id of the item
   */
  isActive(id) {
    if(this.isItemActive.find(item => item.id == id)){
      return true;
    } else return false;
  }

  /**
   * Get the quantity of the item if it was selected before or '' if not
   * @param id 
   */
  getQteOrNull(id){
    if(this.isItemActive.find(item => item.id == id)){
      return this.isItemActive.find(item => item.id == id).qte;
    } else return '';
  }

}

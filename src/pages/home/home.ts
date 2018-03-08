import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {Service} from '../../providers/service/service';
import { Values } from '../../providers/service/values';

@IonicPage()
@Component({
    templateUrl: 'home.html'
})
export class Home {
    status: any;
    items: any;
    product: any;
    options: any;
    id: any;
    variationID: any;
    time: any;
    constructor(public nav: NavController, public service: Service, public values: Values) {
        this.items = [];
        this.options = [];
    }
    getCategory(id, slug) {
        this.items.id = id;
        this.items.slug = slug;
        this.items.categories = this.service.categories;
        this.nav.push('ProductsPage', this.items);
    }
    getCart() {
        this.nav.push('CartPage');
    }
    getSearch() {
        this.nav.push('SearchPage');
    }
    mySlideOptions = {
        initialSlide: 1,
        loop: true,
        autoplay: 5800,
        pager: true
    }
    getId() {
        var i;
        if (this.options.length >= 1)
            var resa = this.options[0].split(":");
        if (this.options.length >= 2)
            var resb = this.options[1].split(":");
        if (this.options.length >= 1)
            for (i = 0; i < this.product.product.variations.length; i++) {
                if (this.product.product.variations[i].attributes[0].option == resa[1]) {
                    if (this.options.length == 1) {
                        break;
                    }
                    else if (this.product.product.variations[i].attributes[1].option == resb[1]) {
                        break;
                    }
                }
            }
    }
}
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Service } from '../providers/service/service';
import { Values } from '../providers/service/values';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  status: any;
  pages: Array<{title: string, component: any}>
  menu: Array<{title: string, component: any}>
  configuration: any;
  items: any;
  buttonLanguagesSettings: boolean= false;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, private oneSignal: OneSignal, public platform: Platform, public service: Service, public values: Values, public translateService: TranslateService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.service.load()
       .then((results) => this.configuration = results);

      if(platform.is('cordova')){
          this.oneSignal.startInit('One-Signal-App-ID', 'FCM-OR-GCM-Sender-ID');

          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

          this.oneSignal.handleNotificationReceived().subscribe(() => {
           // do something when notification is received
          });

          this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when a notification is opened
          });
          this.oneSignal.endInit();
      } 

    });

    this.translateService.setDefaultLang('english');
    //this.platform.setDir('rtl', true);
    //this.values.dir = 'right';

  }

    openPage(page) {
        this.nav.setRoot(page);
    }
    getCategory(id, slug) {
        this.items = [];
        this.items.id = id;
        this.items.slug = slug;
        this.items.categories = this.service.categories;
        this.nav.setRoot('ProductsPage', this.items);
    }
    getCart() {
        this.nav.setRoot('CartPage');
    }
    logout() {
        this.service.logout();
        this.values.wishlistId = [];
    }

    login(){
      this.nav.setRoot('AccountLogin');
    }

    register(){
      this.nav.setRoot('AccountRegister');
    }

    address(){
      this.nav.setRoot('Address');
    }


     order(){
      this.nav.setRoot('Orders');
    }


     cart(){
      this.nav.setRoot('CartPage');
    }

  
    wishlist(){
      this.nav.setRoot('WishlistPage');
    }
    

    shop(){
      this.nav.setRoot(Home);
    }

}
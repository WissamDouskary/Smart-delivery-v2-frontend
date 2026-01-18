import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { signal, computed } from '@angular/core';
import { ReceiverModel } from '../../../receivers/models/receiver.model';
import { receviersService } from '../../../../core/services/receiver.service';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../core/services/products.service';
import { productModel } from '../../../../core/models/product.model';
import { senderService } from '../../../../core/services/senders.service';
import { senderModel } from '../../../../core/models/sender.model';
import { existingProduct } from '../../../../core/models/exist-product.model';
import { createColisModel } from '../../models/create-colis.model';
import { CityService } from '../../../../core/services/city.service';
import { CityModel } from '../../../../core/models/city.model';
import { colisService } from '../../../../core/services/colis.service';
import { map } from 'rxjs';
import { jwtService } from '../../../../core/services/jwt.service';
import { newProductModel } from '../../../../core/models/new-product.model';
import { newReceiverModel } from '../../../receivers/models/new-receiver.model';
import { newSenderModel } from '../../../../core/models/new-sender.model';

@Component({
  selector: 'app-create-colis',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-colis.html',
  styleUrl: './create-colis.css',
})
export class CreateColis implements OnInit {
  private receviersSer = inject(receviersService);
  private productSer = inject(ProductsService);
  private senderSer = inject(senderService);
  private citySer = inject(CityService);
  private colisSer = inject(colisService);
  private jwtSer = inject(jwtService);

  receiverMode = signal<'new' | 'existing'>('existing');
  senderMode = signal<'new' | 'existing'>('existing');

  isProductModalOpen = signal(false);
  productMode = signal<'select' | 'new'>('select');
  productSearcher: string = '';
  selectedProducts = signal<any[]>([]);

  //new products attributes
  productName: string = '';
  productCategorie: string = '';
  productPrice: number = 0;
  productWeight: number = 0;

  isAdmin(): boolean {
    return this.jwtSer.getRole() == 'Manager';
  }

  totalWeight = computed(() => this.selectedProducts().reduce((sum, p) => sum + (p.poids || 0), 0));

  items = computed(() => this.selectedProducts().reduce((sum, p) => sum + (p.quantity || 0), 0));

  existingSenders = signal<senderModel[]>([]);

  getExistingSenders() {
    this.senderSer.getSenders().subscribe({
      next: (data) => {
        this.existingSenders.set(data);
      },
      error: (error) => {
        toast.error('error getting Senders');
      },
    });
  }

  existingReceivers = signal<ReceiverModel[]>([]);

  getExistingReceivers() {
    this.receviersSer.getReceivers().subscribe({
      next: (data) => {
        this.existingReceivers.set(data);
      },
      error: (error) => {
        toast.error('error getting receivers');
      },
    });
  }

  availableProducts = signal<productModel[]>([]);

  loadProducts() {
    this.productSer.getProducts().subscribe({
      next: (data: productModel[]) => {
        console.log(data);
        this.availableProducts.set(data);
      },
      error: (error) => {
        toast.error('error getting products');
      },
    });
  }

  onSearch() {
    if (this.productSearcher == '') {
      this.loadProducts();
    } else {
      this.availableProducts.set(
        this.availableProducts().filter((item) =>
          item.nom.toLowerCase().includes(this.productSearcher.toLowerCase())
        )
      );
    }
  }

  description: string = '';
  vileDistination: string = '';
  sender: string = '';
  receiver: string = '';
  priority: 'URGENT' | 'NORMALE' | 'NON_URGENT' = 'NORMALE';

  existingcitys = signal<CityModel[]>([]);
  city: string = '';

  // new reciever infos
  receiverFirstName: string = "";
  receiverLastName: string = "";
  receiverEmail: string = "";
  receiverTelephone: string = "";
  receiverAdresse: string = "";

  // new senders logic

  senderFirstName: string = "";
  senderLastName: string = "";
  senderEmail: string = "";
  senderTelephone: string = "";
  senderAdresse: string = "";

  getCities() {
    this.citySer.getCities().subscribe({
      next: (data) => {
        this.existingcitys.set(data);
      },
      error: (error) => {
        toast.error('Error getting cities');
      },
    });
  }

  // submit form method
  submitForm() {
    const productsIds: (existingProduct | newProductModel)[] = [];

    // product logic
    this.selectedProducts().forEach((element: productModel) => {
      if (element.id == undefined) {
        productsIds.push({
          nom: this.productName,
          category: this.productCategorie,
          poids: this.productWeight,
          price: this.productPrice,
          quantity: element.quantity,
        });
      } else {
        productsIds.push({
          id: element.id,
          quantity: element.quantity,
        });
      }
    });

    let newReciever: newReceiverModel = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    } 

    // receiver logic
    if (this.receiverMode() == 'new') {
      newReciever = {
        nom: this.receiverLastName,
        prenom: this.receiverFirstName,
        email: this.receiverEmail,
        telephone: this.receiverTelephone,
        adresse: this.receiverAdresse,
      };
    }

    let newSender: newSenderModel = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    } 

    // sender logic
    if (this.senderMode() == 'new') {
      newSender = {
        nom: this.senderLastName,
        prenom: this.senderFirstName,
        email: this.senderEmail,
        telephone: this.senderTelephone,
        adresse: this.senderAdresse,
      };
    }

    let payload: createColisModel = {
      description: this.description,
      vileDistination: this.vileDistination,
      receiver: this.receiver !== "" ?
      {
        id: this.receiver
      } : 
       newReciever
      ,
      sender: this.sender !== "" ? 
      {
        id: this.sender
      } :
        newSender 
      ,
      products: productsIds as any,
      city: {
        id: this.city,
      },
      priority: this.priority,
    };

    console.log(payload)

    this.colisSer.saveColis(payload).subscribe({
      next: (resp: any) => {
        toast.success(resp.message);
      },
      error: (error) => {
        if(error.error.message){
          toast.error(error.error.message);
        }else{
          toast.error("error while creating colis");
        }
      }
    })
  }

  updateQuantity(index: number, delta: number) {
    const list = this.selectedProducts();
    const product = list[index];

    if (product.quantity + delta >= 1) {
      const unitPrice = product.price / product.quantity;
      const unitWeight = (product.poids || 0) / product.quantity;

      product.quantity += delta;
      product.price = unitPrice * product.quantity;
      product.poids = unitWeight * product.quantity;

      this.selectedProducts.set([...list]);
    }
  }

  toggleReceiverMode(mode: 'new' | 'existing') {
    this.receiverMode.set(mode);
  }

  toggleSenderMode(mode: 'new' | 'existing') {
    this.senderMode.set(mode);
  }

  openProductModal() {
    this.isProductModalOpen.set(true);
  }

  closeProductModal() {
    this.isProductModalOpen.set(false);
  }

  setProductMode(mode: 'select' | 'new') {
    this.productMode.set(mode);
  }

  addProduct(product: any) {
    const list = this.selectedProducts();
    const existing = list.find((p) => p.id === product.id);

    if (existing) {
      const unitPrice = existing.price / existing.quantity;
      const unitWeight = (existing.poids || 0) / existing.quantity;

      existing.quantity++;
      existing.price = unitPrice * existing.quantity;
      existing.poids = unitWeight * existing.quantity;

      this.selectedProducts.set([...list]);
    } else {
      this.selectedProducts.set([...list, { ...product, quantity: 1 }]);
    }
    this.closeProductModal();
  }

  removeProduct(index: number) {
    this.selectedProducts.update((prev) => prev.filter((_, i) => i !== index));
  }

  ngOnInit() {
    this.getExistingReceivers();
    this.loadProducts();
    this.getExistingSenders();
    this.getCities();
  }
}

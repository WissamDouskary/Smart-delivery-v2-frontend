import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { signal, computed } from '@angular/core';
import { ReceiverModel } from '../../../receivers/models/receiver.model';
import { receviersService } from '../../../../core/services/receiver.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-create-colis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-colis.html',
  styleUrl: './create-colis.css',
})

export class CreateColis implements OnInit{
  private receviersSer = inject(receviersService); 
  description: string = '';

  receiverMode = signal<'new' | 'existing'>('new');

  isProductModalOpen = signal(false);
  productMode = signal<'select' | 'new'>('select');

  selectedProducts = signal<any[]>([]);

  totalWeight = computed(() =>
    this.selectedProducts().reduce((sum, p) => sum + (p.poids || 0), 0)
  );

  items = computed(() =>
    this.selectedProducts().reduce((sum, p) => sum + (p.quantity || 0), 0)
  );

  estimatedFee = computed(() => {
    const weight = this.totalWeight();
    return weight > 0 ? 20 + (weight * 15) : 0;
  });

  existingReceivers = signal<ReceiverModel[]>([]);

  getExistingReceivers(){
    this.receviersSer.getReceivers().subscribe({
      next: (data) => {
        this.existingReceivers.set(data)
      },
      error: (error) => {
        toast.error(error.error.messsage);
      }
    })
  }

  availableProducts = [
    { id: 'p1', nom: 'Smartphone', category: 'Electronics', poids: 0.5, price: 699 },
    { id: 'p2', nom: 'Laptop', category: 'Electronics', poids: 1.5, price: 1299 },
    { id: 'p3', nom: 'Headphones', category: 'Audio', poids: 0.3, price: 199 },
  ];

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
  }
}

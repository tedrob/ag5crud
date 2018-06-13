import { Component, OnInit } from '@angular/core';
import { CoinService } from './../coin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title = 'Add Coin';
  angForm = new FormGroup ({
    name: new FormControl()
  });

  constructor(private coinservice: CoinService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
  addCoin(name: any, price: any) {
    console.log('about to add ', name);
    this.coinservice.addCoin(name, price);
  }

  ngOnInit() {
  }

}
